import {
	type DragEvent,
	type KeyboardEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import { LogOut, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../../../components/layout/AppHeader";
import { logout } from "../../auth/authApi";
import type {
	Block,
	BlockType,
	DraggedBlock,
	Note,
	PendingDelete,
	PendingBlockForm,
} from "../types";
import AddBlockModal from "./AddBlockModal";
import AddNoteModal from "./AddNoteModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import NoteCard from "./NoteCard";
import { createNoteApi, deleteNoteApi, getNotesApi } from "../../auth/notesApi";
import {
	createBlockApi,
	deleteBlockApi,
	reorderBlockApi,
	type CreateBlockPayload,
} from "../../auth/blockApi";
import { socket } from "../../../lib/socket";

export default function WorkspaceView() {
	const navigate = useNavigate();
	const [notes, setNotes] = useState<Note[]>([]);
	const [draggedBlock, setDraggedBlock] = useState<DraggedBlock | null>(null);
	const [activeTextBlockId, setActiveTextBlockId] = useState<string | null>(
		null
	);
	const [openBlockMenuNoteId, setOpenBlockMenuNoteId] = useState<
		string | null
	>(null);
	const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(
		null
	);
	const [pendingBlockForm, setPendingBlockForm] =
		useState<PendingBlockForm | null>(null);
	const fieldRefs = useRef<Record<string, HTMLElement | null>>({});
	const nextFocusId = useRef<string | null>(null);
	const [isOpenNoteModal, setIsOpenNoteModal] = useState(false);

	useEffect(() => {
		const syncNotes = async () => {
			const response = await getNotesApi();

			setNotes([...response.result]);
		};

		void syncNotes();

		socket.on("notes.updated", syncNotes);

		return () => {
			socket.off("notes.updated", syncNotes);
		};
	}, []);

	useEffect(() => {
		if (!nextFocusId.current) {
			return;
		}

		fieldRefs.current[nextFocusId.current]?.focus();
		nextFocusId.current = null;
	}, [notes]);

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const response = await getNotesApi();

				setNotes(response.result);
			} catch (error) {
				console.error(error);
			}
		};

		void fetchNotes();
	}, []);

	const setFieldRef = (id: string, element: HTMLElement | null) => {
		fieldRefs.current[id] = element;
	};

	const updateBlock = (
		noteId: string,
		blockId: string,
		data: Partial<Block>
	) => {
		setNotes((currentNotes) =>
			currentNotes.map((note) =>
				note.id === noteId
					? {
							...note,
							blocks: note.blocks.map((block) =>
								block.id === blockId
									? { ...block, ...data }
									: block
							),
					  }
					: note
			)
		);
	};

	const handleCreateNote = async (title: string) => {
		try {
			await createNoteApi({
				title,
			});
			setIsOpenNoteModal(false);
		} catch (error) {
			console.error(error);
		}
	};

	const requestDeleteNote = (noteId: string) => {
		const note = notes.find((currentNote) => currentNote.id === noteId);

		setPendingDelete({
			type: "note",
			noteId,
			title: note?.title || "Untitled note",
		});
	};

	const addBlock = async (
		noteId: string,
		content: string,
		type: BlockType = "text",
		checked?: boolean
	) => {
		try {
			const payload: CreateBlockPayload = {
				noteId,
				type,
				content,
			};

			if (type === "checklist") {
				payload.checked = checked;
			}

			await createBlockApi(payload);

			setOpenBlockMenuNoteId(null);
		} catch (error) {
			console.error(error);
		}
	};

	const openAddBlockForm = (noteId: string, type: BlockType) => {
		setOpenBlockMenuNoteId(null);
		setPendingBlockForm({ noteId, type });
	};

	const requestDeleteBlock = (noteId: string, blockId: string) => {
		setPendingDelete({ type: "block", noteId, blockId });
	};

	const confirmDelete = async () => {
		if (!pendingDelete) return;

		try {
			if (pendingDelete.type === "note") {
				await deleteNoteApi(pendingDelete.noteId);
			} else {
				await deleteBlockApi(pendingDelete.blockId);
			}

			setPendingDelete(null);
		} catch (error) {
			console.error(error);
		}
	};
	const handleEnter = (
		event: KeyboardEvent<HTMLElement>,
		noteId: string,
		block: Block
	) => {
		if (event.key !== "Enter" || event.shiftKey || block.type === "code") {
			return;
		}

		event.preventDefault();
		addBlock(noteId, block.type === "checklist" ? "checklist" : "text");
	};

	const moveBlock = async (targetNoteId: string, targetBlockId: string) => {
		if (
			!draggedBlock ||
			draggedBlock.noteId !== targetNoteId ||
			draggedBlock.blockId === targetBlockId
		) {
			return;
		}

		const note = notes.find((note) => note.id === targetNoteId);

		if (!note) {
			return;
		}

		const draggedIndex = note.blocks.findIndex(
			(block) => block.id === draggedBlock.blockId
		);

		const targetIndex = note.blocks.findIndex(
			(block) => block.id === targetBlockId
		);

		if (draggedIndex < 0 || targetIndex < 0) {
			return;
		}

		const nextBlocks = [...note.blocks];

		const [movedBlock] = nextBlocks.splice(draggedIndex, 1);

		nextBlocks.splice(targetIndex, 0, movedBlock);

		try {
			await reorderBlockApi({
				items: nextBlocks.map((block, index) => ({
					id: block.id,
					orderIndex: index,
				})),
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleBlockDragStart = (
		event: DragEvent<HTMLElement>,
		noteId: string,
		blockId: string
	) => {
		event.dataTransfer.effectAllowed = "move";
		event.dataTransfer.setData("text/plain", blockId);
		setDraggedBlock({ noteId, blockId });
	};

	const handleDrop = (
		event: DragEvent<HTMLElement>,
		noteId: string,
		blockId: string
	) => {
		event.preventDefault();
		moveBlock(noteId, blockId);
		setDraggedBlock(null);
	};

	const handleDragOver = (event: DragEvent<HTMLElement>) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	};

	const formatActiveText = (command: "bold" | "italic" | "underline") => {
		if (!activeTextBlockId) {
			return;
		}

		const activeField = fieldRefs.current[activeTextBlockId];
		activeField?.focus();
		document.execCommand(command);

		const activeNote = notes.find((note) =>
			note.blocks.some((block) => block.id === activeTextBlockId)
		);

		if (activeField && activeNote) {
			updateBlock(activeNote.id, activeTextBlockId, {
				content: activeField.innerHTML,
			});
		}
	};

	const toggleBlockMenu = (noteId: string) => {
		setOpenBlockMenuNoteId((openNoteId) =>
			openNoteId === noteId ? null : noteId
		);
	};

	const handleLogout = async () => {
		await logout();
		navigate("/");
	};

	return (
		<main className="min-h-screen bg-sky-50 text-slate-950">
			<AppHeader
				variant="workspace"
				action={
					<div className="flex items-center gap-2">
						<div className="rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700">
							Workspace
						</div>
						<button
							type="button"
							onClick={handleLogout}
							className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-sky-50 hover:text-sky-700"
						>
							<LogOut size={16} />
							Logout
						</button>
					</div>
				}
			/>

			<section className="mx-auto w-full max-w-6xl px-6 py-10">
				<div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm md:p-8">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
						Welcome
					</p>
					<h1 className="mt-3 text-3xl font-semibold tracking-normal md:text-4xl">
						Selamat datang di workspace kamu.
					</h1>
					<p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
						Setiap card adalah note. Di dalam note, kamu bisa tambah
						block, menulis rich text, checklist, gambar, kode, dan
						mengubah urutan block dengan drag & drop.
					</p>
				</div>

				<div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
							Notes
						</p>
						<h2 className="mt-2 text-2xl font-semibold tracking-normal">
							Kumpulan note kamu
						</h2>
					</div>
					<button
						type="button"
						onClick={() => setIsOpenNoteModal(true)}
						className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 md:w-auto"
					>
						<Plus size={17} />
						Add note
					</button>
				</div>

				<div className="mt-6 grid gap-5 lg:grid-cols-2">
					{notes.length === 0 ? (
						<div className="col-span-full text-center text-gray-400">
							Yeayy, tidak ada pekerjaan hari ini!
						</div>
					) : (
						notes.map((note) => (
							<NoteCard
								key={note.id}
								draggedBlock={draggedBlock}
								isBlockMenuOpen={
									openBlockMenuNoteId === note.id
								}
								note={note}
								onAddBlock={openAddBlockForm}
								onDeleteBlock={requestDeleteBlock}
								onDeleteNote={requestDeleteNote}
								onDragEnd={() => setDraggedBlock(null)}
								onDragOver={handleDragOver}
								onDragStart={handleBlockDragStart}
								onDrop={handleDrop}
								onFocusTextBlock={setActiveTextBlockId}
								onFormatText={formatActiveText}
								onKeyDown={handleEnter}
								onRef={setFieldRef}
								onToggleBlockMenu={toggleBlockMenu}
								onUpdateBlock={updateBlock}
							/>
						))
					)}
				</div>
			</section>

			{pendingDelete && (
				<DeleteConfirmModal
					title={
						pendingDelete.type === "note"
							? "Hapus note?"
							: "Hapus block?"
					}
					description={
						pendingDelete.type === "note"
							? `Note "${pendingDelete.title}" akan dihapus dari workspace.`
							: "Block ini akan dihapus dari note."
					}
					onCancel={() => setPendingDelete(null)}
					onConfirm={confirmDelete}
				/>
			)}

			{pendingBlockForm && (
				<AddBlockModal
					blockType={pendingBlockForm.type}
					onClose={() => setPendingBlockForm(null)}
					onSubmit={(data) => {
						addBlock(
							pendingBlockForm.noteId,
							data.content,
							pendingBlockForm.type,
							data.checked
						);

						setPendingBlockForm(null);
					}}
				/>
			)}

			{isOpenNoteModal && (
				<AddNoteModal
					isOpen={isOpenNoteModal}
					onClose={() => setIsOpenNoteModal(false)}
					onSubmit={handleCreateNote}
				/>
			)}
		</main>
	);
}
