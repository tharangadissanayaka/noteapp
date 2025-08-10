import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    superTokenId: string;
}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    superTokenId: { type: String, required: true },
});

export const User = model<IUser>('User', UserSchema);
