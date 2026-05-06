export default function HeroPreview() {
	return (
		<div
			id="preview"
			className="rounded-3xl border border-sky-100 bg-white p-5 shadow-[0_24px_70px_rgba(14,116,144,0.12)]"
		>
			<div className="mb-5 flex items-center gap-2 border-b border-sky-50 pb-4">
				<span className="h-3 w-3 rounded-full bg-sky-300" />
				<span className="h-3 w-3 rounded-full bg-slate-200" />
				<span className="h-3 w-3 rounded-full bg-slate-200" />
			</div>
			<div className="space-y-4">
				<div className="h-7 w-2/3 rounded bg-slate-900" />
				<div className="h-3 w-full rounded bg-sky-100" />
				<div className="h-3 w-5/6 rounded bg-sky-100" />
				<div className="mt-6 rounded-2xl bg-sky-50 p-4">
					<div className="h-3 w-1/3 rounded bg-sky-200" />
					<div className="mt-4 h-3 w-full rounded bg-white" />
					<div className="mt-3 h-3 w-4/5 rounded bg-white" />
				</div>
			</div>
		</div>
	);
}
