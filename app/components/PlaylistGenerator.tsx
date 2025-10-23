"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

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
