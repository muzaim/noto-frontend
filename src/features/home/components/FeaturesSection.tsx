import { features } from "../homeData";
import "aos/dist/aos.css";

export default function FeaturesSection() {
	return (
		<section className="bg-white">
			<div className="mx-auto w-full max-w-6xl px-6 py-16">
				<div className="max-w-3xl">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
						Kenapa Noto
					</p>
					<h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950">
						Fokus nulis, bukan sibuk ngatur workspace.
					</h2>
				</div>

				<div className="mt-8 grid gap-4 md:grid-cols-3">
					{features.map((feature, index) => (
						<article
							key={feature.title}
							data-aos="fade-up"
							data-aos-delay={index * 250}
							className="rounded-2xl border border-sky-100 bg-sky-50 p-5"
						>
							<h3 className="text-lg font-semibold text-slate-950">
								{feature.title}
							</h3>

							<p className="mt-3 text-sm leading-6 text-slate-600">
								{feature.description}
							</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
