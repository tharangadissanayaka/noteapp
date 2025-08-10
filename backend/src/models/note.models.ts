import { Schema, model, Document } from 'mongoose';

export interface INote extends Document {
    userId: string;
    title: string;
    date: Date;
    description: string;
    hashtags: string[];
    isPinned?: boolean;
}

const NoteSchema = new Schema<INote>({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    hashtags: { type: [String], required: true },
    isPinned: { type: Boolean, default: false },
});

export const Note = model<INote>('Note', NoteSchema);
