import { NextFunction, Request, Response } from "express";
import { Note } from '../models/note.models';

async function updateNoteHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.body;
        const updateData = req.body;
        const updatedNote = await Note.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedNote) {
            const error = new Error('Note not found');
            (error as any).status = 404;
            throw error;
        }
        res.json(updatedNote);
    } catch (error) {
        next(error);
        console.log("updateNoteHandlerError: ", error);
    }

}

export default updateNoteHandler;