import { Link } from "react-router-dom";

export default function HomeCta() {
	return (
		<section className="bg-white">
			<div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-5 px-6 py-12 md:flex-row md:items-center">
				<div>
					<h2 className="text-2xl font-semibold tracking-normal">
						Siap mulai nulis?
					</h2>
					<p className="mt-2 text-sm leading-6 text-slate-600">
						Masuk dulu, lalu kamu bisa lanjut ke workspace sederhana.
					</p>
				</div>
				<Link
					to="/login"
					className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
				>
					Buka workspace
				</Link>
			</div>
		</section>
	);
}
