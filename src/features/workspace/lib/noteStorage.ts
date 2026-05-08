import type { Note } from "../types";

const NOTES_STORAGE_KEY = "noto-workspace-notes";

export const saveNotes = (notes: Note[]) => {
	localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
};
