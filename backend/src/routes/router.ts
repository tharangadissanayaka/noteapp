import express from 'express';
import handlers from '../controllers/export.handlers';


const router = express.Router();


//get all notes
router.get('/all-notes', handlers.allNotes);

//add new note
router.post('/add-note', handlers.addNote);

//update note
router.put('/update-note', handlers.updateNote);

//delte note
router.delete('/delete-note', handlers.deleteNote);

//add user
router.post('/add-user', handlers.createUser);

//get user
router.get('/get-user', handlers.getUser);


export default router;