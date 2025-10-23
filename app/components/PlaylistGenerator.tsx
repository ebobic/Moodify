"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

// Spotify API funktioner
async function createSpotifyPlaylist(accessToken: string, context: string, mood: string) {
  const playlistName = `Moodify - ${context} (${mood})`;
  const description = `En personlig playlist för ${context.toLowerCase()} när du känner dig ${mood.toLowerCase()}`;
  
  const response = await fetch('https://api.spotify.com/v1/me/playlists', {
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
    throw new Error(`Failed to create playlist: ${response.status}`);
  }

  return await response.json();
}

async function getTrackRecommendations(accessToken: string, context: string, mood: string) {
  // Mappa context och mood till Spotify parametrar
  const { seedGenres, targetFeatures } = mapContextAndMood(context, mood);
  
  const params = new URLSearchParams({
    limit: '20',
    seed_genres: seedGenres.join(','),
    ...targetFeatures
  });

  const response = await fetch(`https://api.spotify.com/v1/recommendations?${params}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to get recommendations: ${response.status}`);
  }

  const data = await response.json();
  return data.tracks.map((track: any) => track.uri);
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
    throw new Error(`Failed to add tracks: ${response.status}`);
  }
}

function mapContextAndMood(context: string, mood: string) {
  // Mappa context till genres
  const contextGenres: { [key: string]: string[] } = {
    'Work': ['work-out', 'focus', 'ambient'],
    'Study': ['study', 'ambient', 'classical'],
    'Workout': ['work-out', 'fitness', 'pop'],
    'Party': ['party', 'dance', 'pop'],
    'Commute': ['road-trip', 'pop', 'indie'],
    'Relax': ['chill', 'ambient', 'acoustic']
  };

  // Mappa mood till audio features
  const moodFeatures: { [key: string]: any } = {
    'Happy': { valence: 0.8, energy: 0.7 },
    'Energetic': { energy: 0.9, valence: 0.7 },
    'Calm': { valence: 0.6, energy: 0.3 },
    'Focused': { energy: 0.5, valence: 0.5 },
    'Romantic': { valence: 0.7, energy: 0.4 },
    'Melancholic': { valence: 0.2, energy: 0.3 }
  };

  return {
    seedGenres: contextGenres[context] || ['pop'],
    targetFeatures: moodFeatures[mood] || { valence: 0.5, energy: 0.5 }
  };
}

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
      const errorMsg = "No access token available";
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implementera Spotify API-anrop
      console.log(`Genererar playlist för context: ${context}, mood: ${mood}`);
      
      // Simulera API-anrop för tillfället
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Ersätt med riktig playlist-URL
      const mockPlaylistUrl = `https://open.spotify.com/playlist/mock-${context}-${mood}`;
      setPlaylistUrl(mockPlaylistUrl);
      onComplete?.(mockPlaylistUrl);
      
    } catch (err) {
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
