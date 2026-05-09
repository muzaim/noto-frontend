import { Link } from "react-router-dom";
import AppHeader from "../components/layout/AppHeader";
import FeaturesSection from "../features/home/components/FeaturesSection";
import HomeFooter from "../features/home/components/HomeFooter";
import HomeHero from "../features/home/components/HomeHero";
import StepsSection from "../features/home/components/StepsSection";
import Pricing from "../features/home/components/Pricing";

export default function Home() {
	return (
		<main className="min-h-screen bg-sky-50 text-slate-950">
			<AppHeader
				action={
					<Link
						to="/login"
						className="rounded-full border border-sky-200 bg-white px-5 py-2 text-sm font-medium text-sky-700 shadow-sm transition hover:border-sky-300 hover:bg-sky-100"
					>
						Login
					</Link>
				}
			/>
			<HomeHero />
			<FeaturesSection />
			<StepsSection />
			<Pricing />
			<HomeFooter />
		</main>
	);
}
