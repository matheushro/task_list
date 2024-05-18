import mongoose from "mongoose"
const URI = process.env.MONGODB_URI

const connectMongoDB = async () => {
    if(!URI) return

    try {
        await mongoose.connect(URI)
    } catch (error) {
        console.log(error)
    }
}

export default connectMongoDB