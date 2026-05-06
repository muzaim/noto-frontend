export type BlockType = "text" | "checklist" | "image" | "code";

export type Block = {
	id: string;
	type: BlockType;
	content: string;
	checked?: boolean;
};

export type Note = {
	id: string;
	title: string;
	blocks: Block[];
};

export type DraggedBlock = {
	noteId: string;
	blockId: string;
};

export type PendingDelete =
	| { type: "note"; noteId: string; title: string }
	| { type: "block"; noteId: string; blockId: string };

export type PendingBlockForm = {
	noteId: string;
	type: BlockType;
};