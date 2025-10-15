"use client";

import { Dumbbell, Briefcase, BookOpen, PartyPopper, Car, Home, Smile, Zap, Wind, Target, Heart, Cloud } from "lucide-react";

export default function HomePage() {
  const handleContextClick = (context: string) => {
    console.log(`Selected context: ${context}`);
  };

  const handleMoodClick = (mood: string) => {
    console.log(`Selected mood: ${mood}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full space-y-16">
        {/* Step 1: Listening Context */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold">
              Choose Your Listening Context
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
              What are you doing right now?
            </p>
          </div>

          {/* Context Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Workout */}
            <button
              onClick={() => handleContextClick("Workout")}
              className="bg-zinc-900 rounded-lg md:rounded-xl p-2 md:p-4 lg:p-6 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-1 md:space-y-3 min-h-[80px] md:min-h-[120px]"
            >
              <Dumbbell className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />
              <h3 className="text-xs md:text-base lg:text-lg font-bold">Workout</h3>
              <p className="text-[10px] md:text-xs opacity-90">
                High energy for exercise
              </p>
            </button>

            {/* Work */}
            <button
              onClick={() => handleContextClick("Work")}
              className="bg-zinc-900 rounded-lg md:rounded-xl p-2 md:p-4 lg:p-6 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-1 md:space-y-3 min-h-[80px] md:min-h-[120px]"
            >
              <Briefcase className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              <h3 className="text-xs md:text-base lg:text-lg font-bold">Work</h3>
              <p className="text-[10px] md:text-xs opacity-90">
                Focus and productivity
              </p>
            </button>

            {/* Study */}
            <button
              onClick={() => handleContextClick("Study")}
              className="bg-zinc-900 rounded-lg md:rounded-xl p-2 md:p-4 lg:p-6 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-1 md:space-y-3 min-h-[80px] md:min-h-[120px]"
            >
              <BookOpen className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              <h3 className="text-xs md:text-base lg:text-lg font-bold">Study</h3>
              <p className="text-[10px] md:text-xs opacity-90">
                Concentration mode
              </p>
            </button>

            {/* Party */}
            <button
              onClick={() => handleContextClick("Party")}
              className="bg-zinc-900 rounded-lg md:rounded-xl p-2 md:p-4 lg:p-6 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-1 md:space-y-3 min-h-[80px] md:min-h-[120px]"
            >
              <PartyPopper className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              <h3 className="text-xs md:text-base lg:text-lg font-bold">Party</h3>
              <p className="text-[10px] md:text-xs opacity-90">
                Upbeat and festive
              </p>
            </button>

            {/* Commute */}
            <button
              onClick={() => handleContextClick("Commute")}
              className="bg-zinc-900 rounded-lg md:rounded-xl p-2 md:p-4 lg:p-6 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-1 md:space-y-3 min-h-[80px] md:min-h-[120px]"
            >
              <Car className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              <h3 className="text-xs md:text-base lg:text-lg font-bold">Commute</h3>
              <p className="text-[10px] md:text-xs opacity-90">
                Travel and transit
              </p>
            </button>

            {/* Relax */}
            <button
              onClick={() => handleContextClick("Relax")}
              className="bg-zinc-900 rounded-lg md:rounded-xl p-2 md:p-4 lg:p-6 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-1 md:space-y-3 min-h-[80px] md:min-h-[120px]"
            >
              <Home className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              <h3 className="text-xs md:text-base lg:text-lg font-bold">Relax</h3>
              <p className="text-[10px] md:text-xs opacity-90">
                Chill at home
              </p>
            </button>
          </div>
        </div>

        {/* Step 2: Select Mood */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl md:text-2xl font-bold">
              Select Your Mood
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
              How are you feeling today?
            </p>
          </div>

          {/* Mood Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Happy */}
            <button
              onClick={() => handleMoodClick("Happy")}
              className="bg-zinc-900 rounded-lg md:rounded-xl p-2 md:p-4 lg:p-6 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-1 md:space-y-3 min-h-[80px] md:min-h-[120px]"
            >
              <Smile className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              <h3 className="text-xs md:text-base lg:text-lg font-bold">Happy</h3>
              <p className="text-[10px] md:text-xs opacity-90">
                Positive vibes
              </p>
            </button>

            {/* Energetic */}
            <button
              onClick={() => handleMoodClick("Energetic")}
              className="bg-zinc-900 rounded-lg md:rounded-xl p-2 md:p-4 lg:p-6 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-1 md:space-y-3 min-h-[80px] md:min-h-[120px]"
            >
              <Zap className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              <h3 className="text-xs md:text-base lg:text-lg font-bold">Energetic</h3>
              <p className="text-[10px] md:text-xs opacity-90">
                Pump it up
              </p>
            </button>

            {/* Calm */}
            <button
              onClick={() => handleMoodClick("Calm")}
              className="bg-zinc-900 rounded-lg md:rounded-xl p-2 md:p-4 lg:p-6 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-1 md:space-y-3 min-h-[80px] md:min-h-[120px]"
            >
              <Wind className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              <h3 className="text-xs md:text-base lg:text-lg font-bold">Calm</h3>
              <p className="text-[10px] md:text-xs opacity-90">
                Peaceful & relaxed
              </p>
            </button>

            {/* Focused */}
            <button
              onClick={() => handleMoodClick("Focused")}
              className="bg-zinc-900 rounded-lg md:rounded-xl p-2 md:p-4 lg:p-6 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-1 md:space-y-3 min-h-[80px] md:min-h-[120px]"
            >
              <Target className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              <h3 className="text-xs md:text-base lg:text-lg font-bold">Focused</h3>
              <p className="text-[10px] md:text-xs opacity-90">
                Deep concentration
              </p>
            </button>

            {/* Romantic */}
            <button
              onClick={() => handleMoodClick("Romantic")}
              className="bg-zinc-900 rounded-lg md:rounded-xl p-2 md:p-4 lg:p-6 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-1 md:space-y-3 min-h-[80px] md:min-h-[120px]"
            >
              <Heart className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              <h3 className="text-xs md:text-base lg:text-lg font-bold">Romantic</h3>
              <p className="text-[10px] md:text-xs opacity-90">
                Love & emotion
              </p>
            </button>

            {/* Melancholic */}
            <button
              onClick={() => handleMoodClick("Melancholic")}
              className="bg-zinc-900 rounded-lg md:rounded-xl p-2 md:p-4 lg:p-6 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-1 md:space-y-3 min-h-[80px] md:min-h-[120px]"
            >
              <Cloud className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              <h3 className="text-xs md:text-base lg:text-lg font-bold">Melancholic</h3>
              <p className="text-[10px] md:text-xs opacity-90">
                Reflective & moody
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

