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
  // Hämta användarens toppartister för personliga rekommendationer
  const topArtistsResponse = await fetch('https://api.spotify.com/v1/me/top/artists?limit=6&time_range=medium_term', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  });

  let personalArtists = [];
  if (topArtistsResponse.ok) {
    const topArtists = await topArtistsResponse.json();
    personalArtists = topArtists.items.map((artist: { name: string }) => artist.name);
    console.log('Using user\'s top artists for personalization:', personalArtists);
  }

  // Skapa flera söktermer baserat på användarens artister + context + mood
  let allTracks = [];
  
  if (personalArtists.length > 0) {
    // Sök med varje artist för mer variation
    for (let i = 0; i < Math.min(personalArtists.length, 6); i++) {
      const searchQuery = `${personalArtists[i]} ${context} ${mood}`;
      console.log(`Searching with artist ${i + 1}:`, searchQuery);
      
      const searchResponse = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=4`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });

      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        console.log(`Results for ${personalArtists[i]}:`, searchData.tracks.items.length);
        allTracks = [...allTracks, ...searchData.tracks.items];
      }
    }
  }

  // Om vi inte får tillräckligt med resultat från artister, lägg till generiska sökresultat
  if (allTracks.length < 15) {
    console.log('Not enough personalized results, adding generic search:', context);
    const genericSearchResponse = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(context)} ${mood}&type=track&limit=${20 - allTracks.length}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    if (genericSearchResponse.ok) {
      const genericData = await genericSearchResponse.json();
      console.log('Generic search results:', genericData.tracks.items.length);
      allTracks = [...allTracks, ...genericData.tracks.items];
    }
  }

  // Ta bort duplicater och returnera max 20 låtar
  const uniqueTracks = allTracks.filter((track, index, self) => 
    index === self.findIndex(t => t.id === track.id)
  ).slice(0, 20);

  console.log('Final track count:', uniqueTracks.length);
  return uniqueTracks.map((track: { uri: string }) => track.uri);
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
