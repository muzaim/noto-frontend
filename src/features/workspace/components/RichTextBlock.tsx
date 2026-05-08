import { type KeyboardEvent, useEffect, useRef } from "react";
import type { Block } from "../types";

type RichTextBlockProps = {
	block: Block;
	index: number;
	noteId: string;
	onFocus: (id: string) => void;
	onKeyDown: (
		event: KeyboardEvent<HTMLElement>,
		noteId: string,
		block: Block,
		index: number,
	) => void;
	onRef: (id: string, element: HTMLElement | null) => void;
	onUpdate: (noteId: string, blockId: string, data: Partial<Block>) => void;
};

export default function RichTextBlock({
	block,
	index,
	noteId,
	onFocus,
	onKeyDown,
	onRef,
	onUpdate,
}: RichTextBlockProps) {
	const editorRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (
			!editorRef.current ||
			editorRef.current.innerHTML === block.content
		) {
			return;
		}

		editorRef.current.innerHTML = block.content;
	}, [block.content, block.id]);

	return (
		<div
			ref={(element) => {
				editorRef.current = element;

				if (element) {
					element.innerText = block.content;
				}

				onRef(block.id, element);
			}}
			contentEditable
			suppressContentEditableWarning
			onFocus={() => onFocus(block.id)}
			onInput={(event) =>
				onUpdate(noteId, block.id, {
					content: JSON.stringify({
						text: event.currentTarget.innerText,
					}),
				})
			}
			onKeyDown={(event) => onKeyDown(event, noteId, block, index)}
			className="min-h-10 w-full rounded-xl px-1 py-2 text-base leading-7 text-slate-800 outline-none empty:before:text-slate-300 empty:before:content-[attr(data-placeholder)]"
			data-placeholder="Tulis paragraf..."
		/>
	);
}
