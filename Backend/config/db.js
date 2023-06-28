import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected  ${conn.connection.host}`)
    } catch{
        console.error('failed to connect')
        process.exit(1)
    }
}

export default connectDB