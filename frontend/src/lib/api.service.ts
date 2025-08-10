import type { Note, UserNoteResponseItem } from "@/types/types";
import axios from "axios";
import Session from 'supertokens-web-js/recipe/session';


const api = {
    createUser: async (superTokenId: string, email: string) => {
        const response = await axios.post(
            'http://localhost:4000/note-app/add-user',
            { superTokenId, email },
            { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
        );
        return response;
    },
    getUser: async (superTokenId: string) => {
        const response = await axios.get('http://localhost:4000/note-app/get-user', {
            params: { superTokenId: superTokenId },
            withCredentials: true,
        });
        return response;
    },
    createNote: async (note: Note) => {
        const userId = await Session.getUserId();

        const payload = {
            userId,
            title: note.title,
            date: new Date(),
            description: note.content,
            hashtags: note.tags,
            isPinned: false,
        };

        const response = await axios.post(
            'http://localhost:4000/note-app/add-note',
            payload,
            {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            }
        );

        return response.data;
    },
    delteNote: async (noteId: string) => {
        const response = await axios.delete(
            'http://localhost:4000/note-app/delete-note',
            {
                data: { id: noteId },
                withCredentials: true,
            }
        );
        return response.data;
    },
    updateNote: async (noteId: string, note: Note | { isPinned: boolean }) => {
        const response = await axios.put(
            'http://localhost:4000/note-app/update-note',
            {
                id: noteId,
                ...note,
            },
            {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            }
        );
        return response.data;
    },
    getUserNotes: async () => {
        const userId = await Session.getUserId();
        const response = await axios.get(
            `http://localhost:4000/note-app/all-notes`,
            {
                params: { userId },
                withCredentials: true,
            }
        );
        return response.data as UserNoteResponseItem[];
    }
};


export default api;