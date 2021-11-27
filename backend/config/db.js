import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log(`Database is connected: ${conn.connection.host}`.black.bold.bgGreen);
    } catch (error) {
        console.error(`Error: ${error}`.red.bold);
        process.exit(1);
    }
}

export default connectDB