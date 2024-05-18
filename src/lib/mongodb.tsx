import mongoose from "mongoose"
const URI = process.env.MONGODB_URI

const connectMongoDB = async () => {
    if(!URI) return

    try {
        await mongoose.connect(URI)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
}

export default connectMongoDB