import { Outlet } from "react-router-dom";
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

export function PublicLayout() {
	return (
		<div className="min-h-screen flex flex-col">
			{/* Navigation */}
			<header className="border-b">
				<div className="container mx-auto px-4 py-4">
					<nav className="flex items-center justify-between">
						<Link to="/" className="flex items-center space-x-2">
							<span className="text-2xl font-bold text-primary">KCF</span>
						</Link>

						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuItem>
									<Link to="/about">
										<NavigationMenuLink className="px-4 py-2">
											About
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuTrigger>Programs</NavigationMenuTrigger>
									<NavigationMenuContent>
										<div className="grid gap-3 p-6 w-[400px]">
											<Link
												to="/programs"
												className="block p-2 hover:bg-accent"
											>
												Our Programs
											</Link>
											<Link
												to="/scholarship"
												className="block p-2 hover:bg-accent"
											>
												Scholarship Program
											</Link>
											<Link
												to="/projects"
												className="block p-2 hover:bg-accent"
											>
												Current Projects
											</Link>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<Link to="/gallery">
										<NavigationMenuLink className="px-4 py-2">
											Gallery
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<NavigationMenuTrigger>Get Involved</NavigationMenuTrigger>
									<NavigationMenuContent>
										<div className="grid gap-3 p-6 w-[400px]">
											<Link
												to="/volunteer"
												className="block p-2 hover:bg-accent"
											>
												Volunteer With Us
											</Link>
											<Link
												to="/support"
												className="block p-2 hover:bg-accent"
											>
												Support Our Cause
											</Link>
											<Link
												to="/partnerships"
												className="block p-2 hover:bg-accent"
											>
												Partnerships
											</Link>
										</div>
									</NavigationMenuContent>
								</NavigationMenuItem>

								<NavigationMenuItem>
									<Link to="/contact">
										<NavigationMenuLink className="px-4 py-2">
											Contact
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>

						<Link to="/support">
							<Button variant="secondary">Donate</Button>
						</Link>
					</nav>
				</div>
			</header>

			{/* Main Content */}
			<main className="flex-grow">
				<Outlet />
			</main>

			{/* Footer */}
			<footer className="bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 py-12">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div>
							<h3 className="text-lg font-semibold mb-4">About KCF</h3>
							<p className="text-sm">
								Kalikwani Children's Foundation is dedicated to empowering children
								and transforming lives through education, support, and community
								development.
							</p>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-4">Quick Links</h3>
							<ul className="space-y-2 text-sm">
								<li>
									<Link to="/about">About Us</Link>
								</li>
								<li>
									<Link to="/programs">Our Programs</Link>
								</li>
								<li>
									<Link to="/gallery">Gallery</Link>
								</li>
								<li>
									<Link to="/contact">Contact Us</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-4">Get Involved</h3>
							<ul className="space-y-2 text-sm">
								<li>
									<Link to="/volunteer">Volunteer</Link>
								</li>
								<li>
									<Link to="/support">Donate</Link>
								</li>
								<li>
									<Link to="/partnerships">Partner With Us</Link>
								</li>
								<li>
									<Link to="/impact-stories">Impact Stories</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="text-lg font-semibold mb-4">Contact Info</h3>
							<ul className="space-y-2 text-sm">
								<li>Busota, Southern Division</li>
								<li>Kamuli Municipality, Uganda</li>
								<li>Phone: +256 701 952867</li>
								<li>Email: info@kalikwanichildrenfoundation.org</li>
							</ul>
						</div>
					</div>

					<div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm">
						<p>
							&copy; {new Date().getFullYear()} Kalikwani Children's Foundation. All
							rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
