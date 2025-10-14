export function LandingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="max-w-2xl text-center space-y-8">
        {/* Logo */}
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
          Moodify
        </h1>

        {/* Tagline */}
        <h2 className="text-2xl md:text-3xl font-semibold">
          Music that matches your mood
        </h2>

        {/* Beskrivning */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Discover the perfect playlist for any moment. Whether you&apos;re studying, 
          running, or just relaxing, Moodify creates personalized music recommendations 
          based on how you feel.
        </p>

        {/* Sign in knapp */}
        <div className="pt-4">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
            Sign in with Spotify
          </button>
        </div>
      </div>
    </div>
  );
}

