import { Pencil, Trash2 } from "lucide-react";
import type { DragEvent, KeyboardEvent } from "react";
import type { Block, BlockType, DraggedBlock, Note } from "../types";
import BlockItem from "./BlockItem";
import BlockToolbar from "./BlockToolbar";

type NoteCardProps = {
	draggedBlock: DraggedBlock | null;
	isBlockMenuOpen: boolean;
	note: Note;
	onAddBlock: (noteId: string, type: BlockType) => void;
	onDeleteBlock: (noteId: string, blockId: string) => void;
	onDeleteNote: (noteId: string) => void;
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
	onFormatText: (command: "bold" | "italic" | "underline") => void;
	onKeyDown: (
		event: KeyboardEvent<HTMLElement>,
		noteId: string,
		block: Block,
		index: number
	) => void;
	onRef: (id: string, element: HTMLElement | null) => void;
	onToggleBlockMenu: (noteId: string) => void;
	onUpdateBlock: (
		noteId: string,
		blockId: string,
		data: Partial<Block>
	) => void;
	onEditNoteModal: (note: Note) => void;
};

export default function NoteCard({
	draggedBlock,
	isBlockMenuOpen,
	note,
	onAddBlock,
	onDeleteBlock,
	onDeleteNote,
	onDragEnd,
	onDragOver,
	onDragStart,
	onDrop,
	onFocusTextBlock,
	onFormatText,
	onKeyDown,
	onRef,
	onToggleBlockMenu,
	onUpdateBlock,
	onEditNoteModal,
}: NoteCardProps) {
	return (
		<article className="rounded-3xl border border-sky-100 bg-white p-5 shadow-sm md:p-6">
			<div className="mb-5 flex flex-col gap-4">
				<div className="flex items-start justify-between gap-3">
					<h1 className="w-full text-2xl font-semibold tracking-normal text-slate-950">
						{note.title || "Untitled note"}
					</h1>

					<div className="flex items-center gap-2">
						<BlockToolbar
							isBlockMenuOpen={isBlockMenuOpen}
							onAddBlock={(type) => onAddBlock(note.id, type)}
							onFormatText={onFormatText}
							onRequestClose={() => onToggleBlockMenu(note.id)}
							onToggleBlockMenu={() => onToggleBlockMenu(note.id)}
						/>
						<button
							type="button"
							onClick={() => onEditNoteModal(note)}
							className="shrink-0 rounded-full border border-yellow-100 p-2 text-yellow-500 transition hover:bg-red-50"
							aria-label="Delete note"
						>
							<Pencil size={17} />
						</button>
						<button
							type="button"
							onClick={() => onDeleteNote(note.id)}
							className="shrink-0 rounded-full border border-red-100 p-2 text-red-500 transition hover:bg-red-50"
							aria-label="Delete note"
						>
							<Trash2 size={17} />
						</button>
					</div>
				</div>
			</div>

			<div className="space-y-3">
				{note.blocks.length === 0 ? (
					<div className="py-3 text-center text-sm italic text-gray-400">
						Tidak ada block
					</div>
				) : (
					note.blocks
						.filter((block) => !block.parentId)
						.map((block, index) => {
							const childBlocks = note.blocks.filter(
								(child) => child.parentId === block.id
							);

							return (
								<div key={block.id}>
									<BlockItem
										block={block}
										draggedBlock={draggedBlock}
										index={index}
										noteId={note.id}
										onDeleteBlock={onDeleteBlock}
										onDragEnd={onDragEnd}
										onDragOver={onDragOver}
										onDragStart={onDragStart}
										onDrop={onDrop}
										onFocusTextBlock={onFocusTextBlock}
										onKeyDown={onKeyDown}
										onRef={onRef}
										onUpdateBlock={onUpdateBlock}
									/>

									{childBlocks.length > 0 && (
										<div className="mt-2 space-y-2 border-l border-sky-100 pl-6">
											{childBlocks.map(
												(child, childIndex) => (
													<BlockItem
														key={child.id}
														block={child}
														draggedBlock={
															draggedBlock
														}
														index={childIndex}
														noteId={note.id}
														onDeleteBlock={
															onDeleteBlock
														}
														onDragEnd={onDragEnd}
														onDragOver={onDragOver}
														onDragStart={
															onDragStart
														}
														onDrop={onDrop}
														onFocusTextBlock={
															onFocusTextBlock
														}
														onKeyDown={onKeyDown}
														onRef={onRef}
														onUpdateBlock={
															onUpdateBlock
														}
													/>
												)
											)}
										</div>
									)}
								</div>
							);
						})
				)}
			</div>
		</article>
	);
}
