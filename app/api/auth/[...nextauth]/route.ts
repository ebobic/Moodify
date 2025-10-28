import NextAuth, { NextAuthOptions } from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

/**
 * Spotify OAuth scopes - Permissions vi begär från användaren
 * https://developer.spotify.com/documentation/web-api/concepts/scopes
 */
const scopes = [
  "user-read-email",
  "user-read-private",
  "user-top-read",
  "playlist-modify-public",
  "playlist-modify-private",
].join(" ")

const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: scopes,
        },
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    // Spara Spotify access token när användaren loggar in
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      return token
    },
    // Gör access token tillgänglig i sessionen för att kunna anropa Spotify API:t!
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      return session
    },
  },
}
// Skapa NextAuth handler
const handler = NextAuth(authOptions)

// Exportera för både GET och POST requests (krävs av Next.js App Router)
export { handler as GET, handler as POST }