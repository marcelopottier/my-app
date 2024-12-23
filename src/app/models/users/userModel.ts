import mongoose, { Schema, Document } from 'mongoose';

export interface IUsers extends Document {
  email: string;
  password: string;
  username: string;
  isAdmin: boolean;
  isActive: boolean;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
});

// Usa `mongoose.models.User` para evitar a redefinição do modelo
const User = mongoose.models.User || mongoose.model<IUsers>('users', UserSchema);

export default User;
