export default function Pricing() {
	return (
		<section className="bg-white">
			<div className="mx-auto w-full max-w-6xl px-6 py-16">
				<div className="text-center">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
						Pricing
					</p>

					<h2 className="mt-3 text-4xl font-semibold tracking-normal text-slate-950">
						Pakai gratis, upgrade kalau memang perlu.
					</h2>

					<p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
						Noto dibuat supaya kamu bisa langsung mulai nulis tanpa
						kepikiran biaya di awal.
					</p>
				</div>

				<div className="mt-12 grid gap-6 md:grid-cols-2">
					<div
						data-aos="fade-right"
						className="rounded-3xl border border-sky-100 bg-white p-8 shadow-sm"
					>
						<div className="flex items-center justify-between">
							<h3 className="text-2xl font-semibold text-slate-950">
								Free
							</h3>

							<span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
								Popular
							</span>
						</div>

						<div className="mt-6 flex items-end gap-2">
							<span className="text-5xl font-bold text-slate-950">
								Rp0
							</span>

							<span className="mb-1 text-slate-500">
								/selamanya
							</span>
						</div>

						<ul className="mt-8 space-y-4 text-sm text-slate-700">
							<li>• Unlimited notes</li>
							<li>• Realtime workspace</li>
							<li>• Block editor</li>
							<li>• Checklist & code block</li>
							<li>• Audit trail</li>
						</ul>

						<button className="mt-8 w-full rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600">
							Mulai Gratis
						</button>
					</div>

					<div
						data-aos="fade-left"
						data-aos-delay="200"
						className="rounded-3xl border border-sky-200 bg-sky-50 p-8 shadow-sm"
					>
						<div className="flex items-center justify-between">
							<h3 className="text-2xl font-semibold text-slate-950">
								Pro
							</h3>

							<span className="rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-white">
								Best Value
							</span>
						</div>

						<div className="mt-6 flex items-end gap-2">
							<span className="text-5xl font-bold text-slate-950">
								Rp29k
							</span>

							<span className="mb-1 text-slate-500">/bulan</span>
						</div>

						<ul className="mt-8 space-y-4 text-sm text-slate-700">
							<li>• Semua fitur Free</li>
							<li>• AI assistant</li>
							<li>• Export markdown</li>
							<li>• Team collaboration</li>
							<li>• Priority support</li>
						</ul>

						<button className="mt-8 w-full rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-600">
							Upgrade Pro
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
