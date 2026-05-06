import { Link } from "react-router-dom";
import HeroPreview from "./HeroPreview";

export default function HomeHero() {
	return (
		<section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-14 md:grid-cols-[1fr_0.85fr] md:py-20">
			<div>
				<p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
					Simple workspace
				</p>
				<h1 className="max-w-2xl text-5xl font-semibold leading-tight tracking-normal text-slate-950 md:text-6xl">
					Catat ide, susun tulisan, dan lanjutkan kapan saja.
				</h1>
				<p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
					Noto adalah workspace sederhana bergaya Notion untuk mulai menulis
					tanpa banyak distraksi.
				</p>
				<div className="mt-8 flex flex-wrap gap-3">
					<Link
						to="/login"
						className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-600"
					>
						Mulai menulis
					</Link>
					<a
						href="#preview"
						className="rounded-full border border-sky-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-sky-100"
					>
						Lihat preview
					</a>
				</div>
			</div>

			<HeroPreview />
		</section>
	);
}
