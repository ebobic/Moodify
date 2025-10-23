"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

interface LoginButtonProps {
  callbackUrl?: string;
  className?: string;
  children?: React.ReactNode;
}

export function LoginButton({ 
  callbackUrl = "/home", 
  className = "",
  children 
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSpotifyLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("spotify", { callbackUrl });
    } catch (error) {
      console.error("Login failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleSpotifyLogin}
      disabled={isLoading}
      className={`bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 md:px-10 md:py-4 rounded-full text-base md:text-lg transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children || (isLoading ? "Loading..." : "Sign in with Spotify")}
    </button>
  );
}
