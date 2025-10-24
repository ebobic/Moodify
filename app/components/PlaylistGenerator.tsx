"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

// Spotify API funktioner
async function createSpotifyPlaylist(accessToken: string, context: string, mood: string) {
  const playlistName = `Moodify - ${context} (${mood})`;
  const description = `En personlig playlist för ${context.toLowerCase()} när du känner dig ${mood.toLowerCase()}`;
  
  // Hämta användar-ID först
  const userResponse = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  });
  
  if (!userResponse.ok) {
    throw new Error(`Failed to get user info: ${userResponse.status}`);
  }
  
  const user = await userResponse.json();
  const userId = user.id;
  
  const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: playlistName,
      description: description,
      public: true
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Create playlist error:', response.status, errorText);
    throw new Error(`Failed to create playlist: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

async function getTrackRecommendations(accessToken: string, context: string, mood: string) {
  // Hämta användarens topplåtar för personliga rekommendationer
  const topTracksResponse = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=medium_term', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  });

  let personalTracks = [];
  if (topTracksResponse.ok) {
    const topTracks = await topTracksResponse.json();
    personalTracks = topTracks.items.map((track: { id: string }) => track.id);
    console.log('Using user\'s top tracks for personalization:', personalTracks);
  }

  // Skapa smart sökterm baserat på context och mood
  const searchQuery = `${context} ${mood}`;
  console.log('Searching for tracks with query:', searchQuery);

  // Sök efter låtar baserat på context och mood
  const searchResponse = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=20`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  });

  if (!searchResponse.ok) {
    const errorText = await searchResponse.text();
    console.error('Spotify Search API Error:', searchResponse.status, errorText);
    throw new Error(`Failed to search tracks: ${searchResponse.status} - ${errorText}`);
  }

  const searchData = await searchResponse.json();
  console.log('Search results:', searchData);

  // Om vi inte får tillräckligt med resultat, försök med bara context
  if (searchData.tracks.items.length < 10) {
    console.log('Not enough results, trying with context only:', context);
    const contextSearchResponse = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(context)}&type=track&limit=20`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    if (contextSearchResponse.ok) {
      const contextData = await contextSearchResponse.json();
      console.log('Context search results:', contextData);
      return contextData.tracks.items.map((track: { uri: string }) => track.uri);
    }
  }

  // Kombinera sökresultat med användarens topplåtar för personlig touch
  const allTracks = searchData.tracks.items;
  
  // Lägg till användarens topplåtar i början för personlig touch
  if (personalTracks.length > 0) {
    const personalUris = personalTracks.map(id => `spotify:track:${id}`);
    console.log('Adding personal tracks for better personalization');
    return [...personalUris.slice(0, 3), ...allTracks.slice(0, 17)].map((track: { uri: string }) => track.uri);
  }

  return allTracks.map((track: { uri: string }) => track.uri);
}

async function addTracksToPlaylist(accessToken: string, playlistId: string, trackUris: string[]) {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uris: trackUris
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Add tracks error:', response.status, errorText);
    throw new Error(`Failed to add tracks: ${response.status} - ${errorText}`);
  }
}

// Denna funktion behövs inte längre eftersom vi använder search istället för recommendations

interface PlaylistGeneratorProps {
  context: string;
  mood: string;
  onComplete?: (playlistUrl: string) => void;
  onError?: (error: string) => void;
}

export function PlaylistGenerator({ 
  context, 
  mood, 
  onComplete, 
  onError 
}: PlaylistGeneratorProps) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playlistUrl, setPlaylistUrl] = useState<string | null>(null);

  const generatePlaylist = async () => {
    if (!session?.accessToken) {
      const errorMsg = "No access token available. Please log out and log in again.";
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(`Genererar playlist för context: ${context}, mood: ${mood}`);
      console.log('Access token available:', !!session.accessToken);
      
      // 1. Skapa en ny playlist
      console.log('Creating playlist...');
      const playlist = await createSpotifyPlaylist(session.accessToken, context, mood);
      console.log('Playlist created:', playlist);
      
      // 2. Hämta låtrekommendationer baserat på context och mood
      console.log('Getting track recommendations...');
      const tracks = await getTrackRecommendations(session.accessToken, context, mood);
      console.log('Tracks found:', tracks.length);
      
      // 3. Lägg till låtar till playlisten
      if (tracks.length > 0) {
        console.log('Adding tracks to playlist...');
        await addTracksToPlaylist(session.accessToken, playlist.id, tracks);
        console.log('Tracks added successfully');
      } else {
        console.warn('No tracks found for recommendations');
        throw new Error('No tracks found for the selected context and mood. Please try different selections.');
      }
      
      // 4. Returnera playlist-URL
      setPlaylistUrl(playlist.external_urls.spotify);
      onComplete?.(playlist.external_urls.spotify);
      
    } catch (err) {
      console.error('Playlist generation error:', err);
      const errorMsg = err instanceof Error ? err.message : "Failed to generate playlist";
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  if (playlistUrl) {
    return (
      <div className="text-center space-y-4">
        <div className="text-green-600 font-semibold">
          Playlist generated successfully!
        </div>
        <a 
          href={playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Open Playlist in Spotify
        </a>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center space-y-4">
        <div className="text-red-600 font-semibold">
          {error}
        </div>
        <button
          onClick={generatePlaylist}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      <button
        onClick={generatePlaylist}
        disabled={isLoading}
        className="bg-black hover:bg-gray-800 text-white font-semibold px-12 py-5 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Generating Playlist..." : "Generate Playlist"}
      </button>
    </div>
  );
}
