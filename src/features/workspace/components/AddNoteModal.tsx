import { X } from "lucide-react";
import { useState } from "react";
import { updateNoteApi } from "../../auth/notesApi";

type Props = {
	isOpen: boolean;
	noteId?: number | null;
	initialTitle?: string;
	onClose: () => void;
	onSubmit: (title: string) => void;
};

export default function CreateNoteModal({
	isOpen,
	noteId,
	initialTitle,
	onClose,
	onSubmit,
}: Props) {
	const [title, setTitle] = useState<string>(initialTitle ?? "");
	const [error, setError] = useState("");
	if (!isOpen) return null;

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!title.trim()) {
			setError("Judul note wajib diisi");

			return;
		}

		setError("");

		if (noteId) {
			await updateNoteApi(noteId, {
				title,
			});
		} else {
			await onSubmit(title);
		}

		setTitle("");

		onClose();
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-4"
			onMouseDown={(event) => {
				if (event.target === event.currentTarget) {
					onClose();
				}
			}}
		>
			<div className="w-full max-w-md rounded-2xl border border-sky-100 bg-white p-5 shadow-xl">
				<div className="flex items-start justify-between gap-4">
					<h2 className="text-lg font-semibold text-slate-950">
						{noteId ? "Edit Note" : "Buat Note Baru"}
					</h2>
					<button
						type="button"
						onClick={onClose}
						className="rounded-full p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
					>
						<X size={18} />
					</button>
				</div>

				<form onSubmit={handleFormSubmit} className="mt-5">
					<label className="block">
						<span className="text-sm font-medium text-slate-700">
							Judul Note
						</span>

						<input
							type="text"
							value={title}
							onChange={(e) => {
								setTitle(e.target.value);

								if (error) {
									setError("");
								}
							}}
							placeholder="Masukkan judul note..."
							className="mt-2 w-full rounded-xl border border-sky-100 px-4 py-3 text-sm outline-none transition placeholder:text-slate-300 focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
						/>
						{error && (
							<p className="mt-2 text-sm font-medium text-red-500">
								{error}
							</p>
						)}
					</label>

					<div className="mt-6 flex justify-end gap-2">
						<button
							type="button"
							onClick={onClose}
							className="rounded-full border border-sky-100 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-sky-50"
						>
							Batal
						</button>
						<button
							type="submit"
							className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600"
						>
							{noteId ? "Update Note" : "Buat Note"}{" "}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
