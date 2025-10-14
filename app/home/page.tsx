export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            Choose your listening context
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            What are you doing right now?
          </p>
        </div>

        {/* Mood Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">
              Select Your Mood
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
              How are you feeling today?
            </p>
          </div>

          {/* Mood Grid ska vara här! */}
          <div className="text-center text-gray-500">
            Mood cards coming soon...
          </div>
        </div>
      </div>
    </div>
  );
}

