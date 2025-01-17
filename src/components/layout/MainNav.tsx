import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function MainNav() {
	return (
		<nav className="hidden gap-6 lg:flex items-center justify-between w-full">
			<Link to="/" className="flex items-center space-x-2">
				<span className="text-2xl font-bold text-primary">KCF</span>
			</Link>

			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<Link to="/about">
							<NavigationMenuLink className="px-4 py-2">About</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<NavigationMenuTrigger>Programs</NavigationMenuTrigger>
						<NavigationMenuContent>
							<div className="grid gap-3 p-6 w-[400px]">
								<Link to="/programs" className="block p-2 hover:bg-accent">
									Our Programs
								</Link>
								<Link to="/scholarship" className="block p-2 hover:bg-accent">
									Scholarship Program
								</Link>
								<Link to="/projects" className="block p-2 hover:bg-accent">
									Current Projects
								</Link>
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<Link to="/gallery">
							<NavigationMenuLink className="px-4 py-2">Gallery</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<NavigationMenuTrigger>Get Involved</NavigationMenuTrigger>
						<NavigationMenuContent>
							<div className="grid gap-3 p-6 w-[400px]">
								<Link to="/volunteer" className="block p-2 hover:bg-accent">
									Volunteer With Us
								</Link>
								<Link to="/support" className="block p-2 hover:bg-accent">
									Support Our Cause
								</Link>
								<Link to="/partnerships" className="block p-2 hover:bg-accent">
									Partnerships
								</Link>
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>

					<NavigationMenuItem>
						<Link to="/contact">
							<NavigationMenuLink className="px-4 py-2">Contact</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

			<Link to="/support">
				<Button variant="secondary">Donate</Button>
			</Link>
		</nav>
	);
}
