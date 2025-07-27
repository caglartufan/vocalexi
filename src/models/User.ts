import mongoose, { Document, Model, Schema } from 'mongoose';

// 1. Interface for User properties
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Extend Document if you want `._id` and mongoose instance methods
export interface IUserDocument extends IUser, Document {}

// 3. Schema definition
const UserSchema = new Schema<IUserDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// 4. Safe model export (avoids overwrite error in Next.js dev)
export const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema);
