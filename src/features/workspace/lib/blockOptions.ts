import type { BlockType } from "../types";

export const blockOptions: Array<{ type: BlockType; label: string }> = [
	{ type: "text", label: "Text" },
	{ type: "checklist", label: "Checklist" },
	{ type: "image", label: "Image" },
	{ type: "code", label: "Code" },
];
