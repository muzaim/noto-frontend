import type { FormEventHandler, ReactNode } from "react";

type AuthFormCardProps = {
	children: ReactNode;
	onSubmit: FormEventHandler<HTMLFormElement>;
	submitLabel: string;
};

export default function AuthFormCard({
	children,
	onSubmit,
	submitLabel,
}: AuthFormCardProps) {
	return (
		<form
			onSubmit={onSubmit}
			className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm"
		>
			<div className="space-y-4">{children}</div>
			<button
				type="submit"
				className="mt-6 w-full rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-200"
			>
				{submitLabel}
			</button>
		</form>
	);
}
