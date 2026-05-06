import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type AppHeaderProps = {
	action?: ReactNode;
	variant?: "page" | "workspace";
};

export default function AppHeader({ action, variant = "page" }: AppHeaderProps) {
	const headerClassName =
		variant === "workspace"
			? "border-b border-sky-100 bg-white"
			: "bg-transparent";

	return (
		<header className={headerClassName}>
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
				<Link to="/" className="text-lg font-semibold tracking-tight">
					Noto
				</Link>
				{action}
			</div>
		</header>
	);
}
