import api from '@/lib/api.service';
import type { Note, UserNoteResponseItem } from '@/types/types';

export async function createNewNote(note: Note) {
    try {
        return await api.createNote(note);
    } catch (error: any) {
        const message = error?.response?.data?.message || 'Failed to create note.';
        throw new Error(message);
    }
}

export async function fetchUserNotes(): Promise<UserNoteResponseItem[]> {
    try {
        return await api.getUserNotes();
    } catch (error: any) {
        const message = error?.response?.data?.message || 'Failed to fetch notes.';
        throw new Error(message);
    }
}

export async function updateNote(noteId: string, note: Note) {
    try {
        return await api.updateNote(noteId, note);
    } catch (error: any) {
        const message = error?.response?.data?.message || 'Failed to update note.';
        throw new Error(message);
    }
}

export async function deleteNote(noteId: string) {
    try {
        return await api.delteNote(noteId);
    } catch (error: any) {
        const message = error?.response?.data?.message || 'Failed to delete note.';
        throw new Error(message);
    }
}

export async function toggleNotePin(noteId: string, isPinned: boolean) {
    try {
        return await api.updateNote(noteId, { isPinned });
    } catch (error: any) {
        const message = error?.response?.data?.message || 'Failed to toggle pin status.';
        throw new Error(message);
    }
}