"use client";

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
            <h1 className="text-3xl md:text-4xl font-bold">
              Choose Your Listening Context
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
              What are you doing right now?
            </p>
          </div>

          {/* Context Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Workout */}
            <button
              onClick={() => handleContextClick("Workout")}
              className="bg-zinc-900 rounded-lg md:rounded-2xl p-3 md:p-6 lg:p-8 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-2 md:space-y-4 min-h-[100px] md:min-h-[140px]"
            >
              <h3 className="text-sm md:text-xl lg:text-2xl font-bold">Workout</h3>
              <p className="text-xs md:text-sm opacity-90">
                High energy for exercise
              </p>
            </button>

            {/* Work */}
            <button
              onClick={() => handleContextClick("Work")}
              className="bg-zinc-900 rounded-lg md:rounded-2xl p-3 md:p-6 lg:p-8 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-2 md:space-y-4 min-h-[100px] md:min-h-[140px]"
            >
              <h3 className="text-sm md:text-xl lg:text-2xl font-bold">Work</h3>
              <p className="text-xs md:text-sm opacity-90">
                Focus and productivity
              </p>
            </button>

            {/* Study */}
            <button
              onClick={() => handleContextClick("Study")}
              className="bg-zinc-900 rounded-lg md:rounded-2xl p-3 md:p-6 lg:p-8 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-2 md:space-y-4 min-h-[100px] md:min-h-[140px]"
            >
              <h3 className="text-sm md:text-xl lg:text-2xl font-bold">Study</h3>
              <p className="text-xs md:text-sm opacity-90">
                Concentration mode
              </p>
            </button>

            {/* Party */}
            <button
              onClick={() => handleContextClick("Party")}
              className="bg-zinc-900 rounded-lg md:rounded-2xl p-3 md:p-6 lg:p-8 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-2 md:space-y-4 min-h-[100px] md:min-h-[140px]"
            >
              <h3 className="text-sm md:text-xl lg:text-2xl font-bold">Party</h3>
              <p className="text-xs md:text-sm opacity-90">
                Upbeat and festive
              </p>
            </button>

            {/* Commute */}
            <button
              onClick={() => handleContextClick("Commute")}
              className="bg-zinc-900 rounded-lg md:rounded-2xl p-3 md:p-6 lg:p-8 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-2 md:space-y-4 min-h-[100px] md:min-h-[140px]"
            >
              <h3 className="text-sm md:text-xl lg:text-2xl font-bold">Commute</h3>
              <p className="text-xs md:text-sm opacity-90">
                Travel and transit
              </p>
            </button>

            {/* Relax */}
            <button
              onClick={() => handleContextClick("Relax")}
              className="bg-zinc-900 rounded-lg md:rounded-2xl p-3 md:p-6 lg:p-8 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-2 md:space-y-4 min-h-[100px] md:min-h-[140px]"
            >
              <h3 className="text-sm md:text-xl lg:text-2xl font-bold">Relax</h3>
              <p className="text-xs md:text-sm opacity-90">
                Chill at home
              </p>
            </button>
          </div>
        </div>

        {/* Step 2: Select Mood */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">
              Select Your Mood
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
              How are you feeling today?
            </p>
          </div>

          {/* Mood Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Happy */}
            <button
              onClick={() => handleMoodClick("Happy")}
              className="bg-zinc-900 rounded-lg md:rounded-2xl p-3 md:p-6 lg:p-8 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-2 md:space-y-4 min-h-[100px] md:min-h-[140px]"
            >
              <h3 className="text-sm md:text-xl lg:text-2xl font-bold">Happy</h3>
              <p className="text-xs md:text-sm opacity-90">
                Positive vibes
              </p>
            </button>

            {/* Energetic */}
            <button
              onClick={() => handleMoodClick("Energetic")}
              className="bg-zinc-900 rounded-lg md:rounded-2xl p-3 md:p-6 lg:p-8 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-2 md:space-y-4 min-h-[100px] md:min-h-[140px]"
            >
              <h3 className="text-sm md:text-xl lg:text-2xl font-bold">Energetic</h3>
              <p className="text-xs md:text-sm opacity-90">
                Pump it up
              </p>
            </button>

            {/* Calm */}
            <button
              onClick={() => handleMoodClick("Calm")}
              className="bg-zinc-900 rounded-lg md:rounded-2xl p-3 md:p-6 lg:p-8 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-2 md:space-y-4 min-h-[100px] md:min-h-[140px]"
            >
              <h3 className="text-sm md:text-xl lg:text-2xl font-bold">Calm</h3>
              <p className="text-xs md:text-sm opacity-90">
                Peaceful & relaxed
              </p>
            </button>

            {/* Focused */}
            <button
              onClick={() => handleMoodClick("Focused")}
              className="bg-zinc-900 rounded-lg md:rounded-2xl p-3 md:p-6 lg:p-8 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-2 md:space-y-4 min-h-[100px] md:min-h-[140px]"
            >
              <h3 className="text-sm md:text-xl lg:text-2xl font-bold">Focused</h3>
              <p className="text-xs md:text-sm opacity-90">
                Deep concentration
              </p>
            </button>

            {/* Romantic */}
            <button
              onClick={() => handleMoodClick("Romantic")}
              className="bg-zinc-900 rounded-lg md:rounded-2xl p-3 md:p-6 lg:p-8 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-2 md:space-y-4 min-h-[100px] md:min-h-[140px]"
            >
              <h3 className="text-sm md:text-xl lg:text-2xl font-bold">Romantic</h3>
              <p className="text-xs md:text-sm opacity-90">
                Love & emotion
              </p>
            </button>

            {/* Melancholic */}
            <button
              onClick={() => handleMoodClick("Melancholic")}
              className="bg-zinc-900 rounded-lg md:rounded-2xl p-3 md:p-6 lg:p-8 text-white shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-200 flex flex-col items-center justify-center text-center space-y-2 md:space-y-4 min-h-[100px] md:min-h-[140px]"
            >
              <h3 className="text-sm md:text-xl lg:text-2xl font-bold">Melancholic</h3>
              <p className="text-xs md:text-sm opacity-90">
                Reflective & moody
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

