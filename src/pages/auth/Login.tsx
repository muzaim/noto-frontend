import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../../features/auth/authApi";
import AuthFormCard from "../../features/auth/components/AuthFormCard";
import AuthLayout from "../../features/auth/components/AuthLayout";
import AuthTextField from "../../features/auth/components/AuthTextField";

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
	} = useForm<LoginFormValues>();

	const handleLogin = async (values: LoginFormValues) => {
		setIsLoading(true);
		await login(values);
		navigate("/workspace");
	};

	return (
		<AuthLayout title="Login" description="Masuk untuk lanjut menulis catatanmu.">
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
