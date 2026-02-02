import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL || "mongodb+srv://divyanshu930462:tvtsHw64lclsRUEN@cluster0.plhtjxa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

// Global variable for reuse (avoids re-connecting)
let isConnected = false;

const DbConnect = async () => {
  if (isConnected) {
    // console.log('➡️ Using existing MongoDB connection');
    return;
  }

  try {
    await mongoose.connect(DATABASE_URL, {
      dbName: process.env.DATABASE_NAME || 'Stole-Folio',
    });

    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ Database connection failed', error);
    process.exit(1);
  }
};



export default DbConnect;