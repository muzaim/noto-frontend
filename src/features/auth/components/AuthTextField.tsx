import type { InputHTMLAttributes } from "react";

type AuthTextFieldProps = {
	error?: string;
	label: string;
	placeholder: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function AuthTextField({
	error,
	label,
	placeholder,
	type = "text",
	...props
}: AuthTextFieldProps) {
	return (
		<label className="block">
			<span className="text-sm font-medium text-slate-700">{label}</span>
			<input
				type={type}
				placeholder={placeholder}
				className="mt-2 w-full rounded-xl border border-sky-100 px-4 py-3 text-sm outline-none transition placeholder:text-slate-300 focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
				{...props}
			/>
			{error && <p className="mt-2 text-sm text-red-500">{error}</p>}
		</label>
	);
}
