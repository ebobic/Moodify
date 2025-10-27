"use client";

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-white text-sm">
            © 2025 Moodify. All rights reserved.
          </div>

          {/* Teknisk info */}
          <div className="text-gray-300 text-xs text-center md:text-right">
            <p>Powered by Spotify Web API</p>
            <p>Built with Next.js, React, TypeScript, Tailwind CSS & NextAuth</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
