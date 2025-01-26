// src/models/user.model.ts
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  socketId: string;
  // Add other fields you might need
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  socketId: { type: String , unique: true, required:true },
  // Add other fields you might need
});

export default model<IUser>('User', UserSchema);