import "next-auth"

// Utöka NextAuth's Session type
declare module "next-auth" {
  interface Session {
    accessToken?: string  // Vår Spotify access token
  }
}

// Utöka NextAuth's JWT type
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string   // Spotify access token
  }
}
