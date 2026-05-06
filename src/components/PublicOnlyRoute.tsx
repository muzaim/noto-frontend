import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../features/auth/authApi";

export default function PublicOnlyRoute() {
	const user = getCurrentUser();

	if (user) {
		return <Navigate to="/workspace" replace />;
	}

	return <Outlet />;
}
