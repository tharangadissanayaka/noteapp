import { Request, Response, NextFunction } from "express";
import { Note } from '../models/note.models';

async function addNoteHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId, title, date, description, hashtags, isPinned } = req.body;
        const newNote = new Note({ userId, title, date, description, hashtags, isPinned });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        next(error);
        console.log("addNoteHandlerError: ", error);
    }

}

export default addNoteHandler;