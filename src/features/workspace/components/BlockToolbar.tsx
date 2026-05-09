import { CheckSquare, Code2, Image, ListPlus, Type } from "lucide-react";
import { useEffect, useRef } from "react";
import { blockOptions } from "../lib/blockOptions";
import type { BlockType } from "../types";

const blockIcons = {
	text: Type,
	checklist: CheckSquare,
	image: Image,
	code: Code2,
};

type BlockToolbarProps = {
	isBlockMenuOpen: boolean;
	onAddBlock: (type: BlockType) => void;
	onFormatText: (command: "bold" | "italic" | "underline") => void;
	onRequestClose: () => void;
	onToggleBlockMenu: () => void;
};

export default function BlockToolbar({
	isBlockMenuOpen,
	onAddBlock,
	onRequestClose,
	onToggleBlockMenu,
}: BlockToolbarProps) {
	const menuRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!isBlockMenuOpen) {
			return;
		}

		const handleOutsideClick = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				onRequestClose();
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [isBlockMenuOpen, onRequestClose]);

	return (
		<div className="flex flex-wrap items-center gap-2">
			<div ref={menuRef} className="relative">
				<button
					type="button"
					onClick={onToggleBlockMenu}
					className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-200"
				>
					<ListPlus size={16} />
				</button>
				{isBlockMenuOpen && (
					<div className="absolute left-0 z-10 mt-2 w-44 overflow-hidden rounded-2xl border border-sky-100 bg-white p-2 shadow-lg">
						{blockOptions.map((option) => {
							const Icon = blockIcons[option.type];

							return (
								<button
									key={option.type}
									type="button"
									onClick={() => onAddBlock(option.type)}
									className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-sky-50 hover:text-sky-700"
								>
									<Icon size={15} />
									{option.label} block
								</button>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
