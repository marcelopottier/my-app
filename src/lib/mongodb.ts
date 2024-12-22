import mongoose from 'mongoose';

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }
  
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb';
  return mongoose.connect(uri, {});
}
