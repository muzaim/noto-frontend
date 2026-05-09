import { GripVertical, Plus, Trash2 } from "lucide-react";
import type { DragEvent, KeyboardEvent } from "react";
import type { Block, DraggedBlock } from "../types";
import { CheckSquare, Code2, Image, Type } from "lucide-react";

import BlockField from "./BlockField";

type BlockItemProps = {
	block: Block;
	draggedBlock: DraggedBlock | null;
	index: number;
	noteId: string;
	onDeleteBlock: (noteId: string, blockId: string) => void;
	onDragEnd: () => void;
	onDragOver: (event: DragEvent<HTMLElement>) => void;
	onDragStart: (
		event: DragEvent<HTMLElement>,
		noteId: string,
		blockId: string
	) => void;
	onDrop: (
		event: DragEvent<HTMLElement>,
		noteId: string,
		blockId: string
	) => void;
	onFocusTextBlock: (id: string) => void;
	onKeyDown: (
		event: KeyboardEvent<HTMLElement>,
		noteId: string,
		block: Block,
		index: number
	) => void;
	onRef: (id: string, element: HTMLElement | null) => void;
	onUpdateBlock: (
		noteId: string,
		blockId: string,
		data: Partial<Block>
	) => void;
};

const renderIcon = (type: string) => {
	switch (type) {
		case "text":
			return <Type size={14} />;
		case "checklist":
			return <CheckSquare size={14} />;
		case "image":
			return <Image size={14} />;
		case "code":
			return <Code2 size={14} />;
		default:
			return <Type size={14} />;
	}
};

const handleClickSub = (block: Block) => {
	console.log(`ehee`, block);
};

export default function BlockItem({
	block,
	draggedBlock,
	index,
	noteId,
	onDeleteBlock,
	onDragEnd,
	onDragOver,
	onDragStart,
	onDrop,
	onFocusTextBlock,
	onKeyDown,
	onRef,
	onUpdateBlock,
}: BlockItemProps) {
	return (
		<section
			onDragOver={onDragOver}
			onDrop={(event) => onDrop(event, noteId, block.id)}
			onDragEnd={onDragEnd}
			className={`group flex gap-3 rounded-2xl border p-3 transition ${
				draggedBlock?.blockId === block.id
					? "border-sky-300 bg-sky-50 opacity-70"
					: "border-sky-100 bg-white hover:border-sky-200"
			}`}
		>
			<div className="flex shrink-0 flex-row items-center gap-2 pt-2">
				<button
					type="button"
					draggable
					onDragStart={(event) =>
						onDragStart(event, noteId, block.id)
					}
					className="cursor-grab rounded-lg px-2 py-1 text-slate-300 transition active:cursor-grabbing group-hover:bg-sky-50 group-hover:text-sky-500"
					aria-label="Drag block"
				>
					<GripVertical size={17} />
				</button>
				<span className="flex items-center justify-center rounded-full bg-sky-50 p-1 text-sky-700">
					{renderIcon(block.type)}
				</span>
			</div>
			<div className="flex min-w-0 flex-1 gap-3">
				<BlockField
					block={block}
					index={index}
					noteId={noteId}
					onFocusTextBlock={onFocusTextBlock}
					onKeyDown={onKeyDown}
					onRef={onRef}
					onUpdateBlock={onUpdateBlock}
				/>
				{!block.parentId && (
					<>
						<button
							type="button"
							onClick={() => handleClickSub(block)}
							className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-sky-100 text-sky-600 transition hover:bg-sky-50"
						>
							<Plus size={14} />
						</button>
					</>
				)}
				<button
					type="button"
					onClick={() => onDeleteBlock(noteId, block.id)}
					className="h-9 shrink-0 rounded-full px-3 text-slate-300 transition hover:bg-red-50 hover:text-red-500"
					aria-label="Delete block"
				>
					<Trash2 size={16} />
				</button>
			</div>
		</section>
	);
}
