import { fakeFetch } from "../../lib/fetcher";
import { clearStoredUser, getStoredUser, setStoredUser, type AuthUser } from "./authStorage";

type LoginPayload = {
	email: string;
	password: string;
};

type RegisterPayload = {
	email: string;
	name: string;
	password: string;
};

export async function login(payload: LoginPayload) {
	const user: AuthUser = {
		email: payload.email,
		name: payload.email.split("@")[0] || "User",
	};

	await fakeFetch({ data: user });
	setStoredUser(user);
	return user;
}

export async function register(payload: RegisterPayload) {
	const user: AuthUser = {
		email: payload.email,
		name: payload.name,
	};

	await fakeFetch({ data: user });
	setStoredUser(user);
	return user;
}

export async function logout() {
	await fakeFetch({ data: true, delay: 200 });
	clearStoredUser();
}

export function getCurrentUser() {
	return getStoredUser();
}
