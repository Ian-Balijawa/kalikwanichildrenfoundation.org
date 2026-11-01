import { Link } from "react-router-dom";
import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";

export function Header() {
	return (
		<header className="site-header sticky top-0 z-50 border-b border-[#e9e5d9] bg-[#fffdf8]/90 backdrop-blur-xl supports-[backdrop-filter]:bg-[#fffdf8]/85">
			<div className="container mx-auto flex min-h-[76px] items-center justify-between gap-5">
				<Link to="/" className="flex min-w-0 items-center gap-3 rounded-lg" aria-label="Kalikwani Children's Support Centre home">
					<img src="/logo.png" alt="" className="h-12 w-12 shrink-0 object-contain" />
					<span className="flex min-w-0 flex-col text-[#193d30] leading-tight">
						<strong className="text-base font-bold tracking-[-.02em] sm:text-lg">Kalikwani</strong>
						<span className="text-[.68rem] font-medium tracking-[.055em] sm:text-xs">CHILDREN’S SUPPORT CENTRE</span>
					</span>
				</Link>
				<MainNav />
				<MobileNav />
			</div>
		</header>
	);
}
