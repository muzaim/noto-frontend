import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import AOS from "aos";

import "aos/dist/aos.css";

import "./index.css";

import App from "./App.tsx";

AOS.init({
	duration: 700,
	once: true,
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
