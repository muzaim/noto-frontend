import { Trash2, X } from "lucide-react";

type DeleteConfirmModalProps = {
	description: string;
	onCancel: () => void;
	onConfirm: () => void;
	title: string;
};

export default function DeleteConfirmModal({
	description,
	onCancel,
	onConfirm,
	title,
}: DeleteConfirmModalProps) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-4">
			<div className="w-full max-w-sm rounded-2xl border border-sky-100 bg-white p-5 shadow-xl">
				<div className="flex items-start justify-between gap-4">
					<div className="flex items-center gap-3">
						<div className="rounded-full bg-red-50 p-2 text-red-500">
							<Trash2 size={18} />
						</div>
						<div>
							<h2 className="text-lg font-semibold text-slate-950">{title}</h2>
							<p className="mt-1 text-sm leading-6 text-slate-500">
								{description}
							</p>
						</div>
					</div>
					<button
						type="button"
						onClick={onCancel}
						className="rounded-full p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
						aria-label="Close modal"
					>
						<X size={18} />
					</button>
				</div>

				<div className="mt-6 flex justify-end gap-2">
					<button
						type="button"
						onClick={onCancel}
						className="rounded-full border border-sky-100 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-sky-50"
					>
						Batal
					</button>
					<button
						type="button"
						onClick={onConfirm}
						className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
					>
						Hapus
					</button>
				</div>
			</div>
		</div>
	);
}
