import type { KeyboardEvent } from "react";
import type { Block } from "../types";
import RichTextBlock from "./RichTextBlock";

type BlockFieldProps = {
	block: Block;
	index: number;
	noteId: string;
	onFocusTextBlock: (id: string) => void;
	onKeyDown: (
		event: KeyboardEvent<HTMLElement>,
		noteId: string,
		block: Block,
		index: number,
	) => void;
	onRef: (id: string, element: HTMLElement | null) => void;
	onUpdateBlock: (
		noteId: string,
		blockId: string,
		data: Partial<Block>,
	) => void;
};

export default function BlockField({
	block,
	index,
	noteId,
	onFocusTextBlock,
	onKeyDown,
	onRef,
	onUpdateBlock,
}: BlockFieldProps) {
	if (block.type === "checklist") {
		return (
			<div className="flex w-full items-center gap-3">
				<input
					type="checkbox"
					checked={Boolean(block.checked)}
					onChange={(event) =>
						onUpdateBlock(noteId, block.id, {
							checked: event.target.checked,
						})
					}
					className="h-5 w-5 rounded border-sky-200 text-sky-500 focus:ring-sky-200"
				/>
				<input
					disabled
					ref={(element) => onRef(block.id, element)}
					type="text"
					value={block.content}
					onChange={(event) =>
						onUpdateBlock(noteId, block.id, {
							content: event.target.value,
						})
					}
					onKeyDown={(event) =>
						onKeyDown(event, noteId, block, index)
					}
					placeholder="Tulis task..."
					className={`min-h-10 w-full bg-transparent text-base outline-none placeholder:text-slate-300 ${
						block.checked
							? "text-slate-400 line-through"
							: "text-slate-800"
					}`}
				/>
			</div>
		);
	}

	if (block.type === "image") {
		return (
			<div className="w-full">
				<input
					disabled
					ref={(element) => onRef(block.id, element)}
					type="url"
					value={block.content}
					onChange={(event) =>
						onUpdateBlock(noteId, block.id, {
							content: event.target.value,
						})
					}
					onKeyDown={(event) =>
						onKeyDown(event, noteId, block, index)
					}
					placeholder="Paste URL gambar..."
					className="w-full rounded-xl border border-sky-100 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-300 focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
				/>
				{block.content && (
					<img
						src={block.content}
						alt="User inserted content"
						className="mt-4 max-h-80 w-full rounded-2xl border border-sky-100 object-cover"
					/>
				)}
			</div>
		);
	}

	if (block.type === "code") {
		return (
			<textarea
				disabled
				ref={(element) => onRef(block.id, element)}
				value={block.content}
				onChange={(event) =>
					onUpdateBlock(noteId, block.id, {
						content: event.target.value,
					})
				}
				placeholder="Tulis kode di sini..."
				rows={5}
				className="w-full resize-y rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 font-mono text-sm leading-6 text-sky-50 outline-none placeholder:text-slate-500 focus:ring-4 focus:ring-sky-100"
			/>
		);
	}

	return (
		<RichTextBlock
			block={block}
			index={index}
			noteId={noteId}
			onFocus={onFocusTextBlock}
			onKeyDown={onKeyDown}
			onRef={onRef}
			onUpdate={onUpdateBlock}
		/>
	);
}
