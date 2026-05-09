import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import type { BlockType } from "../types";

type AddBlockModalProps = {
	blockType: BlockType;
	onClose: () => void;
	onSubmit: (data: { content: string; checked?: boolean }) => void;
};

type BlockFormValues = {
	content: string;
	checked: boolean;
};

const modalCopy = {
	text: {
		title: "Tambah text block",
		label: "Isi text",
		placeholder: "Tulis isi paragraf...",
	},

	checklist: {
		title: "Tambah checklist block",
		label: "Isi task",
		placeholder: "Tulis task...",
	},

	image: {
		title: "Tambah image block",
		label: "URL gambar",
		placeholder: "https://example.com/image.jpg",
	},

	code: {
		title: "Tambah code block",
		label: "Isi kode",
		placeholder: "const hello = 'world';",
	},
} satisfies Record<
	BlockType,
	{
		title: string;
		label: string;
		placeholder: string;
	}
>;

export default function AddBlockModal({
	blockType,
	onClose,
	onSubmit,
}: AddBlockModalProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<BlockFormValues>({
		defaultValues: {
			content: "",
			checked: false,
		},
	});

	const copy = modalCopy[blockType];

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
					<div>
						<h2 className="text-lg font-semibold text-slate-950">
							{copy.title}
						</h2>
					</div>

					<button
						type="button"
						onClick={onClose}
						className="rounded-full p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
						aria-label="Close modal"
					>
						<X size={18} />
					</button>
				</div>

				<form
					onSubmit={handleSubmit((values) =>
						onSubmit({
							content: values.content,
							checked: values.checked,
						})
					)}
					className="mt-5"
				>
					<label className="block">
						<span className="text-sm font-medium text-slate-700">
							{copy.label}
						</span>

						{blockType === "code" ? (
							<textarea
								{...register("content", {
									required: "Field ini wajib diisi",
								})}
								rows={6}
								placeholder={copy.placeholder}
								className="mt-2 w-full rounded-xl border border-sky-100 px-4 py-3 text-sm outline-none transition placeholder:text-slate-300 focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
							/>
						) : (
							<input
								{...register("content", {
									required: "Field ini wajib diisi",
								})}
								type={blockType === "image" ? "url" : "text"}
								placeholder={copy.placeholder}
								className="mt-2 w-full rounded-xl border border-sky-100 px-4 py-3 text-sm outline-none transition placeholder:text-slate-300 focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
							/>
						)}

						{errors.content && (
							<p className="mt-2 text-sm font-medium text-red-500">
								{errors.content.message}
							</p>
						)}
					</label>

					{blockType === "checklist" && (
						<label className="mt-4 flex items-center gap-3 text-sm text-slate-600">
							<input
								{...register("checked")}
								type="checkbox"
								className="h-4 w-4 rounded border-sky-200 text-sky-500 focus:ring-sky-200"
							/>
							Tandai sebagai selesai
						</label>
					)}

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
							Tambah block
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
