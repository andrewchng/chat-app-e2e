import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  // email: string;
  socketId: string;
  // Add other fields you might need
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  // email: { type: String, required: true, unique: true },
  socketId: { type: String, required:true },
  // Add other fields you might need
});

export default model<IUser>('User', UserSchema);