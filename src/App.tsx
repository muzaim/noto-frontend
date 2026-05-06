// App.tsx
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Workspace from "./pages/Workspace";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<PublicOnlyRoute />}>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>
				<Route element={<ProtectedRoute />}>
					<Route path="/workspace" element={<Workspace />} />
				</Route>
				<Route path="/editor" element={<Navigate to="/workspace" replace />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
