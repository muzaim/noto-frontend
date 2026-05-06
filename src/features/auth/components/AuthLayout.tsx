import type { ReactNode } from "react";

type AuthLayoutProps = {
	children: ReactNode;
	description: string;
	title: string;
};

export default function AuthLayout({
	children,
	description,
	title,
}: AuthLayoutProps) {
	return (
		<main className="flex min-h-screen items-center justify-center bg-sky-50 px-5 py-10 text-slate-950">
			<div className="w-full max-w-sm">
				<div className="mb-8 text-center">
					<p className="text-2xl font-semibold tracking-tight">Noto</p>
					<h1 className="mt-8 text-3xl font-semibold tracking-normal">
						{title}
					</h1>
					<p className="mt-3 text-sm leading-6 text-slate-500">
						{description}
					</p>
				</div>

				{children}
			</div>
		</main>
	);
}
