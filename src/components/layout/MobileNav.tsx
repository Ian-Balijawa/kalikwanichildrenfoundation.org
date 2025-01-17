import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export function MobileNav() {
	const [open, setOpen] = useState(false);
	const [programsOpen, setProgramsOpen] = useState(false);
	const [involvedOpen, setInvolvedOpen] = useState(false);

	return (
		<div className="lg:hidden">
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<Button variant="ghost" size="icon" className="lg:hidden">
						<Menu className="h-6 w-6" />
						<span className="sr-only">Toggle menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="right">
					<nav className="flex flex-col space-y-4">
						<Link to="/" className="flex items-center space-x-2 mb-4">
							<span className="text-2xl font-bold text-primary">KCF</span>
						</Link>

						<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
							<Link
								to="/about"
								className="block px-2 py-2 text-lg font-medium hover:text-primary"
								onClick={() => setOpen(false)}
							>
								About
							</Link>
						</motion.div>

						<Collapsible open={programsOpen} onOpenChange={setProgramsOpen}>
							<CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-2 text-lg font-medium hover:text-primary">
								Programs
								<ChevronDown
									className={`h-4 w-4 transition-transform ${
										programsOpen ? "rotate-180" : ""
									}`}
								/>
							</CollapsibleTrigger>
							<CollapsibleContent className="pl-4 space-y-2">
								<Link
									to="/programs"
									className="block py-2 hover:text-primary"
									onClick={() => setOpen(false)}
								>
									Our Programs
								</Link>
								<Link
									to="/scholarship"
									className="block py-2 hover:text-primary"
									onClick={() => setOpen(false)}
								>
									Scholarship Program
								</Link>
								<Link
									to="/projects"
									className="block py-2 hover:text-primary"
									onClick={() => setOpen(false)}
								>
									Current Projects
								</Link>
							</CollapsibleContent>
						</Collapsible>

						<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
							<Link
								to="/gallery"
								className="block px-2 py-2 text-lg font-medium hover:text-primary"
								onClick={() => setOpen(false)}
							>
								Gallery
							</Link>
						</motion.div>

						<Collapsible open={involvedOpen} onOpenChange={setInvolvedOpen}>
							<CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-2 text-lg font-medium hover:text-primary">
								Get Involved
								<ChevronDown
									className={`h-4 w-4 transition-transform ${
										involvedOpen ? "rotate-180" : ""
									}`}
								/>
							</CollapsibleTrigger>
							<CollapsibleContent className="pl-4 space-y-2">
								<Link
									to="/volunteer"
									className="block py-2 hover:text-primary"
									onClick={() => setOpen(false)}
								>
									Volunteer With Us
								</Link>
								<Link
									to="/support"
									className="block py-2 hover:text-primary"
									onClick={() => setOpen(false)}
								>
									Support Our Cause
								</Link>
								<Link
									to="/partnerships"
									className="block py-2 hover:text-primary"
									onClick={() => setOpen(false)}
								>
									Partnerships
								</Link>
							</CollapsibleContent>
						</Collapsible>

						<motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
							<Link
								to="/contact"
								className="block px-2 py-2 text-lg font-medium hover:text-primary"
								onClick={() => setOpen(false)}
							>
								Contact
							</Link>
						</motion.div>

						<Link to="/support" onClick={() => setOpen(false)}>
							<Button variant="secondary" className="w-full">
								Donate
							</Button>
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
		</div>
	);
}
