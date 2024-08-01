import mongoose from "mongoose";

export default function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI);
    } catch (err) {
        console.error(`Error when connecting to DB ${err}`);
        process.exit(1);
    }

    const dbConnection = mongoose.connection;
    dbConnection.once('open', (_) => {
        console.log('Connected to DB!')
    });

    dbConnection.on("error", (err) => {
        console.error(`connection error: ${err}`);
    });

    return;
};
