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
