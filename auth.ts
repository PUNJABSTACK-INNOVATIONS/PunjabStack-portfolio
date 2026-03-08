import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  session: {
    strategy: "jwt",      // Keeps users logged in after server restarts
    maxAge: 30 * 24 * 60 * 60, // Session lasts for 30 days
  },
  callbacks: {
    async signIn({ user }) {
      // 1. Define allowed individual emails
      const allowedEmails = [
        "meghachauhan310@gmail.com", 
        "sarthjoshi904@gmail.com",
        "Sankalpsrivastava47@gmail.com",
        "tarun.mt62@gmail.com"
      ];

      const userEmail = user.email?.toLowerCase();

      // 2. Security Check: Allow if in the list OR if using the company domain
      if (userEmail) {
        if (allowedEmails.includes(userEmail) || userEmail.endsWith("@punjabstack.com")) {
          return true; 
        }
      }

      // 3. Block everyone else
      console.warn("Unauthorized login attempt:", userEmail);
      return false; 
    },
  },
  pages: {
    signIn: "/", // Redirects to your home page if there's an auth error
  }
})