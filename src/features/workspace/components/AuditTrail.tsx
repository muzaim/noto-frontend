import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import AppHeader from "../../../components/layout/AppHeader";
import { getAuditTrailApi } from "../../auth/auditTrailApi";
import { logout } from "../../auth/authApi";

type AuditTrail = {
	id: number;
	action: string;
	table_name: string;
	description: string;
	created_at: string;
};

export default function AuditTrailView() {
	const navigate = useNavigate();
	const [auditTrails, setAuditTrails] = useState<AuditTrail[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchAuditTrail = async () => {
		try {
			const response = await getAuditTrailApi();

			setAuditTrails(response.data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = async () => {
		await logout();
		navigate("/");
	};

	useEffect(() => {
		void fetchAuditTrail();
	}, []);

	return (
		<main className="min-h-screen bg-sky-50 text-slate-950">
			<AppHeader
				variant="workspace"
				action={
					<div className="flex items-center gap-2">
						<Link
							to="/workspace"
							className="rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-700 transition hover:bg-sky-100"
						>
							Workspace
						</Link>

						<Link
							to="/audit-trail"
							className="rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700"
						>
							History
						</Link>

						<button
							type="button"
							onClick={handleLogout}
							className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-sky-50 hover:text-sky-700"
						>
							<LogOut size={16} />
							Logout
						</button>
					</div>
				}
			/>

			<section className="mx-auto w-full max-w-6xl px-6 py-10">
				<div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm md:p-8">
					<h1 className="text-2xl font-bold text-slate-900">
						History
					</h1>

					<p className="mt-2 text-sm text-slate-500">
						Riwayat aktivitas workspace kamu.
					</p>

					<div className="mt-6 space-y-4">
						{loading ? (
							<div className="text-sm text-slate-400">
								Loading...
							</div>
						) : auditTrails.length === 0 ? (
							<div className="text-sm text-slate-400">
								Tidak ada data..
							</div>
						) : (
							auditTrails.map((item) => {
								const actionStyles = {
									CREATE: "bg-sky-100 text-sky-700",

									UPDATE: "bg-amber-100 text-amber-700",

									DELETE: "bg-red-100 text-red-700",
								};

								return (
									<div
										key={item.id}
										className="rounded-2xl border border-sky-100 p-4"
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<span
													className={`rounded-full px-3 py-1 text-xs font-semibold ${
														actionStyles[
															item.action as keyof typeof actionStyles
														]
													}`}
												>
													{item.action}
												</span>

												<span className="text-sm font-medium text-slate-700">
													{item.table_name}
												</span>
											</div>

											<span className="text-xs text-slate-400">
												{new Date(
													item.created_at
												).toLocaleString()}
											</span>
										</div>

										<p className="mt-3 text-sm text-slate-600">
											You {item.description}
										</p>
									</div>
								);
							})
						)}
					</div>
				</div>
			</section>
		</main>
	);
}
