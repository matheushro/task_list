import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import  connectMongoDB  from "@/lib/mongodb"
import User from "@/models/User"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    callbacks: {
        async session({session}){
            return session
        },
        async signIn({profile}){
            console.log(profile)
            try {
                await connectMongoDB()

                const userExists = await User.findOne({email: profile.email});
                if(!userExists){
                    const newUser = new User({
                        name: profile.name,
                        email: profile.email,
                        image: profile.image
                    })
                    await newUser.save()
                }

                
            } catch (error) {
                console.log(error)
            }
        }
    }
})


export {handler as GET, handler as POST};