import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AuthFormCard from "../../features/auth/components/AuthFormCard";
import AuthLayout from "../../features/auth/components/AuthLayout";
import AuthTextField from "../../features/auth/components/AuthTextField";
import { registerApi } from "../../features/auth/authApi";

type RegisterFormValues = {
	name: string;
	email: string;
	password: string;
};

export default function Register() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const {
		formState: { errors },
		handleSubmit,
		register: registerField,
	} = useForm<RegisterFormValues>();

	const handleRegister = async (values: RegisterFormValues) => {
		setIsLoading(true);

		await registerApi(values);

		navigate("/workspace");
	};

	return (
		<AuthLayout
			title="Register"
			description="Buat akun untuk mulai menyimpan note kamu."
		>
			<AuthFormCard
				onSubmit={handleSubmit(handleRegister)}
				submitLabel={isLoading ? "Buat akun..." : "Buat akun"}
			>
				<AuthTextField
					label="Nama"
					placeholder="Nama kamu"
					error={errors.name?.message}
					{...registerField("name", {
						required: "Nama wajib diisi",
					})}
				/>
				<AuthTextField
					label="Email"
					type="email"
					placeholder="nama@email.com"
					error={errors.email?.message}
					{...registerField("email", {
						required: "Email wajib diisi",
					})}
				/>
				<AuthTextField
					label="Password"
					type="password"
					placeholder="Password"
					error={errors.password?.message}
					{...registerField("password", {
						required: "Password wajib diisi",
					})}
				/>
			</AuthFormCard>

			<p className="mt-5 text-center text-sm text-slate-500">
				Sudah punya akun bro?{" "}
				<Link
					to="/login"
					className="font-medium text-sky-600 hover:text-sky-700"
				>
					Login
				</Link>
			</p>
		</AuthLayout>
	);
}
