import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const ConnectionString = process.env.CONNECTION_STRING;

const ConnectToDB = async () => {
    try {
        await mongoose.connect(ConnectionString);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log('FAILED TO CONNECT TO DB')
    }
}

export default ConnectToDB;
