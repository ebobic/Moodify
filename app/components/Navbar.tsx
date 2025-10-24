"use client";

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Ikon-versionen */}
          <div className="flex items-center">
            <Image
              src="/moodify-icon.svg"
              alt="Moodify logo"
              width={40}
              height={40}
              className="w-10 h-10"
              priority
            />
            <span className="ml-3 text-xl font-bold text-gray-900">
              Moodify
            </span>
          </div>

          {/* Användarinfo och Logout */}
          <div className="flex items-center space-x-4">
            {/* Användarens profilbild */}
            {session?.user && (
              <div className="flex items-center">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt="Profile picture"
                    className="w-8 h-8 rounded-full border border-gray-200"
                  />
                )}
              </div>
            )}

            {/* Logout knapp */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
