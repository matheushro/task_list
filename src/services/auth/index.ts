
import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"

import google from "next-auth/providers/google";
import clientPromise from "@/lib/db";

type UserSession = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string; // Add this line
};
type Session = {
    expires: string
    user?: UserSession;
};

export const { 
    handlers: {GET, POST},
    auth,
    signIn,
    signOut
} = NextAuth({
    providers: [google],
    adapter: MongoDBAdapter(clientPromise),
})
