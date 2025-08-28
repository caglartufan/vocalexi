import mongoose, { Document, Model, Schema, Types } from 'mongoose';

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

export interface PublicUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Extend Document with explicit _id typing
export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
}

// 3. Schema definition
const UserSchema = new Schema<IUserDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transform: (doc, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  },
);

// 4. Safe model export (avoids overwrite error in Next.js dev)
export const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema);
