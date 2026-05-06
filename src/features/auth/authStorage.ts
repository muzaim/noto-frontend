const AUTH_STORAGE_KEY = "noto-auth-user";

export type AuthUser = {
	email: string;
	name: string;
};

export function getStoredUser() {
	const rawUser = localStorage.getItem(AUTH_STORAGE_KEY);

	if (!rawUser) {
		return null;
	}

	try {
		return JSON.parse(rawUser) as AuthUser;
	} catch {
		return null;
	}
}

export function setStoredUser(user: AuthUser) {
	localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
	localStorage.removeItem(AUTH_STORAGE_KEY);
}
