import { Footer } from "@/components/layout/Footer";
import { Header } from '@/components/layout/Header';
import { Outlet } from "react-router-dom";

export function PublicLayout() {
	return (
		<div className="flex flex-col min-h-screen w-full">
			<Header />
			{/* Main Content */}
			<main className="flex-1">
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}
