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
		index: number
	) => void;
	onRef: (id: string, element: HTMLElement | null) => void;
	onUpdate: (noteId: string, blockId: string, data: Partial<Block>) => void;
};

export default function RichTextBlock({ block, onRef }: RichTextBlockProps) {
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
		<>
			<div
				ref={(element) => {
					editorRef.current = element;

					if (element) {
						element.innerText = block.content;
					}

					onRef(block.id, element);
				}}
				contentEditable={false}
				suppressContentEditableWarning
				className="min-h-10 w-full rounded-xl px-1 py-2 text-base leading-7 text-slate-800"
				data-placeholder="Tulis paragraf..."
			/>
			<div className="text-xs text-slate-400">{block.orderIndex}</div>
		</>
	);
}
