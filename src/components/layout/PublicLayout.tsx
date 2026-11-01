import { Footer } from "@/components/layout/Footer";
import { Header } from '@/components/layout/Header';
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

export function PublicLayout() {
	const { pathname, hash } = useLocation();
	useEffect(() => {
		const frame = requestAnimationFrame(() => {
			if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
			else window.scrollTo(0, 0);
		});
		return () => cancelAnimationFrame(frame);
	}, [pathname, hash]);
	return (
		<div className="public-site flex flex-col min-h-screen w-full">
			<Header />
			{/* Main Content */}
			<main className="flex-1">
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}
