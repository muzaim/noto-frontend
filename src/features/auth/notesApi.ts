import { api } from "../../lib/axios";
export interface CreateNotePayload {
	title: string;
}
export const getNotesApi = async () => {
	const response = await api.get("/master-data/note");

	return response.data;
};

export const createNoteApi = async (payload: CreateNotePayload) => {
	const response = await api.post("/master-data/note", payload);

	return response.data;
};

export const deleteNoteApi = async (noteId: string) => {
	const response = await api.delete(`/master-data/note/${noteId}`);

	return response.data;
};
