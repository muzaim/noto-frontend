import type { Block, Note } from "../types";
import { createNote } from "./noteFactory";

const NOTES_STORAGE_KEY = "noto-workspace-notes";
const OLD_BLOCKS_STORAGE_KEY = "noto-workspace-blocks";

const fallbackNotes = () => [];

export const getSavedNotes = () => {
	const savedNotes = localStorage.getItem(NOTES_STORAGE_KEY);

	if (savedNotes) {
		try {
			const parsedNotes = JSON.parse(savedNotes) as Note[];
			return parsedNotes.length > 0 ? parsedNotes : fallbackNotes();
		} catch {
			return fallbackNotes();
		}
	}

	const oldSavedBlocks = localStorage.getItem(OLD_BLOCKS_STORAGE_KEY);

	if (oldSavedBlocks) {
		try {
			const parsedBlocks = JSON.parse(oldSavedBlocks) as Block[];
			return [createNote("Catatan hari ini", parsedBlocks)];
		} catch {
			return fallbackNotes();
		}
	}

	return fallbackNotes();
};

export const saveNotes = (notes: Note[]) => {
	localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
};
