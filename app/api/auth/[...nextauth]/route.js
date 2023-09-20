// act as an api route for next-auth
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

/**
 * Creates a NextAuth handler with GoogleProvider and callbacks for authentication and session management.
 *
 * @returns {Object} The NextAuth handler object.
 */
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    /**
     * Retrieves the session and updates the session user's id.
     *
     * @param {Object} session - The session object.
     * @returns {Object} The updated session object.
     */
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    /**
     * Handles the sign-in process.
     *
     * @param {Object} account - The account object containing the user's account information.
     * @param {Object} profile - The profile object containing the user's profile information.
     * @param {Object} user - The user object containing the user's information.
     * @param {Object} credentials - The credentials object containing the user's credentials.
     * @returns {boolean} True if the user exists or is successfully created, false otherwise.
     */
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        //! check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        //! if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  }
});

export { handler as GET, handler as POST }
