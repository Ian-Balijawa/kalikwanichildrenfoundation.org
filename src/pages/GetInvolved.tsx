import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const ways = [
	{ title: "Volunteer your time", description: "Share your knowledge, skills, and time with our community.", to: "/volunteer", action: "Explore volunteering" },
	{ title: "Make a donation", description: "Help sustain our programs and support for children and families.", to: "/support", action: "See ways to give" },
	{ title: "Become a partner", description: "Work together with us to expand opportunities for children.", to: "/partnerships", action: "Explore partnerships" },
];

export default function GetInvolved() {
	return (
		<div>
			<section className="bg-muted py-20">
				<div className="container mx-auto px-4 text-center">
					<h1 className="mb-6 text-4xl font-bold">Get involved</h1>
					<p className="mx-auto max-w-3xl text-lg text-muted-foreground">Join us in our mission to empower children and transform lives. There are many ways to contribute and make a difference in the lives of vulnerable children in Uganda.</p>
				</div>
			</section>
			<section className="bg-[#fffdf8]">
				<div className="container mx-auto">
					<h2 className="mb-10 text-3xl md:text-4xl">Find your way to help</h2>
					<div className="divide-y divide-[#cbd7cb] border-y border-[#cbd7cb]">
						{ways.map((way) => <Link key={way.to} to={way.to} className="group grid gap-3 py-8 md:grid-cols-[.8fr_1fr_auto] md:items-center md:gap-10"><h3 className="text-2xl md:text-3xl">{way.title}</h3><p className="text-muted-foreground">{way.description}</p><span className="inline-flex items-center gap-2 font-semibold text-primary">{way.action}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span></Link>)}
					</div>
				</div>
			</section>
		</div>
	);
}
