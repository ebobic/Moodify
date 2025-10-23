"use client";

import Image from "next/image";
import { LoginButton } from "./LoginButton";

export function LandingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6 py-12">
      <div className="max-w-5xl w-full text-center">
        {/* Hero Section */}
        <div className="space-y-6 md:space-y-8">
          {/* Logo - Största elementet */}
          <div className="mb-6 md:mb-8">
            <Image 
              src="/moodify-logo.svg?v=centered" 
              alt="Moodify logo" 
              width={210} 
              height={60} 
              className="w-[320px] sm:w-[420px] md:w-[520px] lg:w-[650px] h-auto mx-auto"
              priority
            />
          </div>

          {/* Tagline - Andra störst */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 px-4">
            Music that matches your mood
          </h2>

          {/* Beskrivning - Mindre text */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto px-6">
            Discover the perfect playlist for any moment. Whether you&apos;re studying, 
            running, or just relaxing, Moodify creates personalized playlists 
            based on how you feel and what you are up to!
          </p>

          {/* CTA Button - Lagom storlek */}
          <div className="pt-4 md:pt-6">
            <LoginButton />
          </div>
        </div>
      </div>
    </div>
  );
}

