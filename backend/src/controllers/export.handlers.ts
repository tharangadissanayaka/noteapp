import addNoteHandler from './addNote.handler';
import updateNoteHandler from './updateNote.handler';
import deleteNoteHandler from './deleteNote.handler';
import allNotesHandler from './allNotes.handler';
import getUserHandler from './getUser.handler';
import createUserHandler from './createUser.handler';


const handlers = {
    addNote: addNoteHandler,
    updateNote: updateNoteHandler,
    deleteNote: deleteNoteHandler,
    allNotes: allNotesHandler,
    getUser: getUserHandler,
    createUser: createUserHandler
}

export default handlers;