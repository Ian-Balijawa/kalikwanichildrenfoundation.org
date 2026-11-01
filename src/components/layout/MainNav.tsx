import { ArrowUpRight } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const links = [
	{ to: "/about", label: "About" },
	{ to: "/programs", label: "Programs" },
	{ to: "/projects", label: "Projects" },
	{ to: "/gallery", label: "Gallery" },
	{ to: "/get-involved", label: "Get involved" },
	{ to: "/contact", label: "Contact" },
];

export function MainNav() {
	return (
		<nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
			{links.map(({ to, label }) => (
				<NavLink key={to} to={to} className={({ isActive }) => `rounded-full px-3 py-2 text-sm font-semibold transition-colors hover:bg-[#ecf2e9] hover:text-primary ${isActive ? "bg-[#e8f0e7] text-primary" : "text-[#385448]"}`}>
					{label}
				</NavLink>
			))}
			<Button asChild className="ml-3 h-11 rounded-full px-5 shadow-none">
				<Link to="/support">Donate <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
			</Button>
		</nav>
	);
}
