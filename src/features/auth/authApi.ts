import { api } from "../../lib/axios";
import {
	clearStoredUser,
	getStoredUser,
	setStoredUser,
	type AuthUser,
} from "./authStorage";

type LoginPayload = {
	email: string;
	password: string;
};

type RegisterPayload = {
	email: string;
	name: string;
	password: string;
};

export const loginApi = async (payload: LoginPayload) => {
	const response = await api.post("/auth/login", payload);

	const data = response;

	const user: AuthUser = {
		email: data.data.user.email,
		name: data.data.user.name,
	};

	setStoredUser(user);

	return user;
};

export const registerApi = async (payload: RegisterPayload) => {
	const response = await api.post("/auth/register", payload);

	return response.data;
};

export async function logout() {
	await api.post("/auth/logout");

	clearStoredUser();
}

export function getCurrentUser() {
	return getStoredUser();
}
