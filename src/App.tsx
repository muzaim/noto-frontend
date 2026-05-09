// App.tsx
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Workspace from "./pages/Workspace";
import AuditTrail from "./pages/AuditTrail";
import { useEffect, useState } from "react";

function App() {
	const [isSessionExpired, setIsSessionExpired] = useState(false);

	useEffect(() => {
		const handleSessionExpired = () => {
			setIsSessionExpired(true);
		};

		window.addEventListener("session-expired", handleSessionExpired);

		return () => {
			window.removeEventListener("session-expired", handleSessionExpired);
		};
	}, []);
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<PublicOnlyRoute />}>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route path="/workspace" element={<Workspace />} />
						<Route path="/audit-trail" element={<AuditTrail />} />
					</Route>
					<Route
						path="/editor"
						element={<Navigate to="/workspace" replace />}
					/>
				</Routes>
			</BrowserRouter>
			{isSessionExpired && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
					<div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
						<h2 className="text-xl font-semibold text-slate-950">
							Sesi kamu telah habis
						</h2>

						<p className="mt-3 text-sm leading-6 text-slate-600">
							Silakan login kembali untuk melanjutkan aktivitas.
						</p>

						<button
							onClick={() => {
								localStorage.removeItem("noto-auth-user");

								window.location.href = "/login";
							}}
							className="mt-6 w-full rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
						>
							Login Kembali
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default App;
