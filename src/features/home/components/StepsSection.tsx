import { steps } from "../homeData";

export default function StepsSection() {
	return (
		<section className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-16 md:grid-cols-[0.85fr_1fr] md:items-center">
			<div>
				<p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
					Mulai aja dulu
				</p>

				<h2 className="mt-3 text-3xl font-semibold tracking-normal">
					Buka, tulis, simpan.
				</h2>

				<p className="mt-4 text-base leading-7 text-slate-600">
					Pakai buat nyatet ide random, to-do harian, progress
					belajar, atau hal kecil yang takut kelupaan.
				</p>
			</div>

			<div className="space-y-3">
				{steps.map((step, index) => (
					<div
						key={step}
						data-aos="fade-up"
						data-aos-delay={index * 300}
						data-aos-anchor-placement="top-bottom"
						className="flex items-center gap-4 rounded-2xl border border-sky-100 bg-white p-4 shadow-sm"
					>
						<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">
							{index + 1}
						</span>

						<p className="font-medium text-slate-800">{step}</p>
					</div>
				))}
			</div>
		</section>
	);
}
