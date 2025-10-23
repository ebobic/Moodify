"use client";

import { useRef } from "react";
import { useSession } from "next-auth/react";
import { Dumbbell, Briefcase, BookOpen, PartyPopper, Car, Home, Smile, Zap, Wind, Target, Heart, Cloud } from "lucide-react";
import { Navbar } from "../components/Navbar";

export default function HomePage() {
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  // Loading state medan session laddas
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Error state för icke-inloggade användare
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-gray-600">Please log in to access this page.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Go to login
          </button>
        </div>
      </div>
    );
  }

  const scrollToStep = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleContextClick = (context: string) => {
    console.log(`Selected context: ${context}`);
    scrollToStep(step2Ref);
  };

  const handleMoodClick = (mood: string) => {
    console.log(`Selected mood: ${mood}`);
    scrollToStep(step3Ref);
  };


  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Välkomst-meddelande med användarinfo från Spotify Session */}
        <div className="text-center mb-16">
          
          {/* Visa användarens profilbild från Spotify om tillgänglig */}
          {session?.user?.image && (
            <div className="mb-4">
              <img 
                src={session.user.image} 
                alt="Profile picture" 
                className="w-20 h-20 rounded-full mx-auto border-2 border-gray-200"
              />
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome, {session?.user?.name || 'User'}!
          </h1>
          <p className="text-lg text-gray-600">
            Let&apos;s create the perfect playlist for you
          </p>
        </div>
        
        <div className="w-full space-y-32 md:space-y-40">
          {/* Step 1: Listening Context */}
          <div className="space-y-12">
            {/* Step Indicator */}
            <div className="flex justify-center">
              <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                Step 1 of 3
              </span>
            </div>

            <div className="text-center space-y-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Choose Your Listening Context
              </h1>
              <p className="text-base md:text-lg text-gray-600">
                What are you doing right now?
              </p>
            </div>

            {/* Context Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Workout */}
              <button
                onClick={() => handleContextClick("Workout")}
                className="bg-purple-100 hover:bg-purple-200 rounded-3xl p-6 text-gray-900 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center text-center space-y-3 min-h-[140px]"
              >
                <Dumbbell className="w-8 h-8" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold">Workout</h3>
                  <p className="text-xs text-gray-600">
                    High energy for exercise
                  </p>
                </div>
              </button>

              {/* Work */}
              <button
                onClick={() => handleContextClick("Work")}
                className="bg-blue-100 hover:bg-blue-200 rounded-3xl p-6 text-gray-900 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center text-center space-y-3 min-h-[140px]"
              >
                <Briefcase className="w-8 h-8" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold">Work</h3>
                  <p className="text-xs text-gray-600">
                    Focus and productivity
                  </p>
                </div>
              </button>

              {/* Study */}
              <button
                onClick={() => handleContextClick("Study")}
                className="bg-green-100 hover:bg-green-200 rounded-3xl p-6 text-gray-900 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center text-center space-y-3 min-h-[140px]"
              >
                <BookOpen className="w-8 h-8" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold">Study</h3>
                  <p className="text-xs text-gray-600">
                    Concentration mode
                  </p>
                </div>
              </button>

              {/* Party */}
              <button
                onClick={() => handleContextClick("Party")}
                className="bg-pink-100 hover:bg-pink-200 rounded-3xl p-6 text-gray-900 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center text-center space-y-3 min-h-[140px]"
              >
                <PartyPopper className="w-8 h-8" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold">Party</h3>
                  <p className="text-xs text-gray-600">
                    Upbeat and festive
                  </p>
                </div>
              </button>

              {/* Commute */}
              <button
                onClick={() => handleContextClick("Commute")}
                className="bg-orange-100 hover:bg-orange-200 rounded-3xl p-6 text-gray-900 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center text-center space-y-3 min-h-[140px]"
              >
                <Car className="w-8 h-8" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold">Commute</h3>
                  <p className="text-xs text-gray-600">
                    Travel and transit
                  </p>
                </div>
              </button>

              {/* Relax */}
              <button
                onClick={() => handleContextClick("Relax")}
                className="bg-cyan-100 hover:bg-cyan-200 rounded-3xl p-6 text-gray-900 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center text-center space-y-3 min-h-[140px]"
              >
                <Home className="w-8 h-8" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold">Relax</h3>
                  <p className="text-xs text-gray-600">
                    Chill at home
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Step 2: Select Mood */}
          <div ref={step2Ref} className="space-y-12">
            {/* Step Indicator */}
            <div className="flex justify-center">
              <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                Step 2 of 3
              </span>
            </div>

            <div className="text-center space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Select Your Mood
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                How are you feeling today?
              </p>
            </div>

            {/* Mood Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Happy */}
              <button
                onClick={() => handleMoodClick("Happy")}
                className="bg-yellow-100 hover:bg-yellow-200 rounded-3xl p-6 text-gray-900 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center text-center space-y-3 min-h-[140px]"
              >
                <Smile className="w-8 h-8" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold">Happy</h3>
                  <p className="text-xs text-gray-600">
                    Positive vibes
                  </p>
                </div>
              </button>

              {/* Energetic */}
              <button
                onClick={() => handleMoodClick("Energetic")}
                className="bg-red-100 hover:bg-red-200 rounded-3xl p-6 text-gray-900 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center text-center space-y-3 min-h-[140px]"
              >
                <Zap className="w-8 h-8" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold">Energetic</h3>
                  <p className="text-xs text-gray-600">
                    Pump it up
                  </p>
                </div>
              </button>

              {/* Calm */}
              <button
                onClick={() => handleMoodClick("Calm")}
                className="bg-teal-100 hover:bg-teal-200 rounded-3xl p-6 text-gray-900 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center text-center space-y-3 min-h-[140px]"
              >
                <Wind className="w-8 h-8" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold">Calm</h3>
                  <p className="text-xs text-gray-600">
                    Peaceful & relaxed
                  </p>
                </div>
              </button>

              {/* Focused */}
              <button
                onClick={() => handleMoodClick("Focused")}
                className="bg-indigo-100 hover:bg-indigo-200 rounded-3xl p-6 text-gray-900 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center text-center space-y-3 min-h-[140px]"
              >
                <Target className="w-8 h-8" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold">Focused</h3>
                  <p className="text-xs text-gray-600">
                    Deep concentration
                  </p>
                </div>
              </button>

              {/* Romantic */}
              <button
                onClick={() => handleMoodClick("Romantic")}
                className="bg-rose-100 hover:bg-rose-200 rounded-3xl p-6 text-gray-900 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center text-center space-y-3 min-h-[140px]"
              >
                <Heart className="w-8 h-8" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold">Romantic</h3>
                  <p className="text-xs text-gray-600">
                    Love & emotion
                  </p>
                </div>
              </button>

              {/* Melancholic */}
              <button
                onClick={() => handleMoodClick("Melancholic")}
                className="bg-slate-200 hover:bg-slate-300 rounded-3xl p-6 text-gray-900 transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center text-center space-y-3 min-h-[140px]"
              >
                <Cloud className="w-8 h-8" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold">Melancholic</h3>
                  <p className="text-xs text-gray-600">
                    Reflective & moody
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Step 3: Generate Playlist */}
          <div ref={step3Ref} className="space-y-12">
            {/* Step Indicator */}
            <div className="flex justify-center">
              <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                Step 3 of 3
              </span>
            </div>

            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Generate Your Playlist
                </h2>
                <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                  Ready to discover your perfect playlist? Click below to generate a personalized playlist based on your selections.
                </p>
              </div>

              {/* Generate Button */}
              <div className="pt-4">
                <button className="bg-black hover:bg-gray-800 text-white font-semibold px-12 py-5 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer">
                  Generate Playlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

