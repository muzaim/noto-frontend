import { api } from "../../lib/axios";

export interface CreateBlockPayload {
	noteId: string;
	type: string;
	content: string;
	checked?: boolean;
}

export const createBlockApi = async (payload: CreateBlockPayload) => {
	const response = await api.post("/master-data/block", payload);

	return response.data;
};

export const deleteBlockApi = async (blockId: string) => {
	const response = await api.delete(`/master-data/block/${blockId}`);

	return response.data;
};

export const reorderBlockApi = async (payload: {
	items: {
		id: string;
		orderIndex: string;
	}[];
}) => {
	const response = await api.patch("/master-data/block/reorder", payload);

	return response.data;
};
