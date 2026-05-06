import type { Block, BlockType, Note } from "../types";

export const createBlock = (
	type: BlockType = "text",
	data: Partial<Omit<Block, "id" | "type">> = {},
): Block => ({
	id: crypto.randomUUID(),
	type,
	content: data.content ?? "",
	checked: type === "checklist" ? data.checked ?? false : undefined,
});

export const createNote = (
	title = "Untitled note",
	blocks = [createBlock()],
): Note => ({
	id: crypto.randomUUID(),
	title,
	blocks,
});
