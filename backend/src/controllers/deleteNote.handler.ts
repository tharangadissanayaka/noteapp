import { NextFunction, Request, Response } from "express";
import { Note } from '../models/note.models';

async function deleteNoteHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.body;
        const deletedNote = await Note.findOneAndDelete({ _id: id });
        if (!deletedNote) {
            const error = new Error('Note not found');
            (error as any).status = 404;
            throw error;
        }
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        next(error);
        console.log("deleteNoteHandlerError: ", error);
    }

}

export default deleteNoteHandler;