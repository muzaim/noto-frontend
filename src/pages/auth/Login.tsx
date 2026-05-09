import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AuthFormCard from "../../features/auth/components/AuthFormCard";
import AuthLayout from "../../features/auth/components/AuthLayout";
import AuthTextField from "../../features/auth/components/AuthTextField";
import { loginApi } from "../../features/auth/authApi";

type LoginFormValues = {
	email: string;
	password: string;
};

export default function Login() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm<LoginFormValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const [errorMessage, setErrorMessage] = useState("");

	const handleLogin = async (values: LoginFormValues) => {
		try {
			setIsLoading(true);

			setErrorMessage("");

			await loginApi(values);

			navigate("/workspace");
		} catch (error: any) {
			console.error(error);

			setErrorMessage(error?.response?.data?.message ?? "Login gagal");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthLayout
			title="Login"
			description="Masuk untuk lanjut menulis catatanmu."
		>
			<AuthFormCard
				onSubmit={handleSubmit(handleLogin)}
				submitLabel={isLoading ? "Masuk..." : "Masuk"}
			>
				<AuthTextField
					label="Email"
					type="email"
					placeholder="nama@email.com"
					error={errors.email?.message}
					{...register("email", {
						required: "Email wajib diisi",
					})}
				/>
				<AuthTextField
					label="Password"
					type="password"
					placeholder="Password"
					error={errors.password?.message}
					{...register("password", {
						required: "Password wajib diisi",
					})}
				/>

				{errorMessage && (
					<div className="mb-4 mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
						{errorMessage}
					</div>
				)}
			</AuthFormCard>

			<p className="mt-5 text-center text-sm text-slate-500">
				Belum punya akun?{" "}
				<Link
					to="/register"
					className="font-medium text-sky-600 hover:text-sky-700"
				>
					Register
				</Link>
			</p>
		</AuthLayout>
	);
}
