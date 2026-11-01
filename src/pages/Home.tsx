import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const programs = [
	{
		title: "Education Initiative",
		text: "Providing comprehensive educational support through scholarships, materials, and mentoring.",
		to: "/programs",
		link: "Explore education",
	},
	{
		title: "Sustainable Farming",
		text: "Empowering sustainability through farming projects that support our organization's activities.",
		to: "/projects",
		link: "See our projects",
	},
	{
		title: "International Exchange",
		text: "Fostering global connections through our volunteer exchange program.",
		to: "/volunteer",
		link: "Volunteer with us",
	},
];

const impact = [
	{ value: "250+", label: "Children supported" },
	{ value: "5", label: "Schools partnered" },
	{ value: "5+", label: "Active projects" },
	{ value: "4+", label: "International partners" },
];

export default function Home() {
	return (
		<div>
			<section className="home-hero bg-[#f7f3e9]">
				<div className="container mx-auto grid min-h-[670px] items-center gap-10 py-9 md:py-16 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
					<div className="max-w-xl pb-2 lg:py-8">
						<div className="mb-5 flex items-center gap-2 text-sm font-semibold text-[#496553]"><MapPin className="h-4 w-4" aria-hidden="true" /> Kamuli, Uganda</div>
						<h1 className="max-w-[12ch] text-[clamp(2.9rem,6.3vw,6.25rem)]">Empowering children. Transforming lives.</h1>
						<p className="mt-7 max-w-[50ch] text-lg leading-relaxed text-[#3f574a] md:text-xl">Join us in our mission to create a society where every child has equal opportunities to thrive, grow, and reach their full potential.</p>
						<div className="mt-9 flex flex-wrap gap-3">
							<Button asChild size="lg" className="h-12 rounded-full px-6 shadow-none"><Link to="/support">Support our cause <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link></Button>
							<Button asChild size="lg" variant="outline" className="h-12 rounded-full border-[#a9baab] bg-transparent px-6 shadow-none hover:bg-[#e8efe6]"><Link to="/volunteer">Volunteer with us</Link></Button>
						</div>
					</div>
					<figure className="relative m-0 lg:pl-2">
						<div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-[#e4b761]/45 blur-3xl" aria-hidden="true" />
						<img src="/images/IMG-20250624-WA0018.jpg" alt="Children and community members holding up learning materials together outdoors" loading="eager" className="relative aspect-[4/3] w-full rounded-[1.5rem] object-cover shadow-[0_26px_54px_-30px_rgba(22,50,35,.5)] lg:aspect-[.94]" />
						<figcaption className="mt-3 text-sm text-[#526a59]">Learning and growing together in our community.</figcaption>
					</figure>
				</div>
			</section>

			<section className="bg-[#fffdf8]">
				<div className="container mx-auto grid gap-7 lg:grid-cols-[.55fr_1fr] lg:gap-24">
					<h2 className="max-w-[13ch] text-[clamp(2.7rem,4.2vw,4.4rem)]">Every child deserves room to grow.</h2>
					<div className="max-w-[62ch]">
						<p className="text-lg leading-[1.8] text-[#3e574a] md:text-xl">To create a safe nurturing environment for teenagers, vulnerable and homeless children, providing them with access to education, shelter, life skills and advocacy support, enabling them to break the cycle of poverty and build a better future for themselves.</p>
						<Link to="/about" className="mt-7 inline-flex items-center gap-2 border-b border-[#1f5a43] pb-1 font-semibold text-primary hover:gap-3">Learn about our mission <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
					</div>
				</div>
			</section>

			<section className="bg-[#f3efe5]">
				<div className="container mx-auto">
					<div className="mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
						<h2 className="text-[clamp(2.7rem,4.5vw,4.5rem)]">Our programs</h2>
						<p className="max-w-md text-lg text-[#4c6158]">Practical support that helps children and young people learn, feel safe, and build a future.</p>
					</div>
					<div className="divide-y divide-[#ccd6c6] border-y border-[#ccd6c6]">
						{programs.map((program) => (
							<Link key={program.title} to={program.to} className="group grid gap-3 py-7 transition-[padding] hover:pl-2 md:grid-cols-[.8fr_1fr_auto] md:items-center md:gap-10 md:py-9">
								<h3 className="text-2xl md:text-3xl">{program.title}</h3>
								<p className="max-w-[47ch] text-[#4c6158]">{program.text}</p>
								<span className="inline-flex items-center gap-2 font-semibold text-primary">{program.link}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span>
							</Link>
						))}
					</div>
				</div>
			</section>

			<section className="bg-[#fffdf8]">
				<div className="container mx-auto">
					<h2 className="mb-10 text-[clamp(2.5rem,4vw,4rem)]">Growing together</h2>
					<div className="grid grid-cols-2 gap-y-9 border-t border-[#d7dfd4] pt-9 md:grid-cols-4 md:gap-6">
						{impact.map((item) => (
							<div key={item.label} className="pr-4">
								<p className="font-serif text-[clamp(2.6rem,4vw,4rem)] font-bold leading-none tracking-[-.04em] text-primary">{item.value}</p>
								<p className="mt-3 text-sm font-medium text-[#4c6158] md:text-base">{item.label}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="bg-[#194a38] text-white">
				<div className="container mx-auto grid items-center gap-8 md:grid-cols-[1fr_auto] md:gap-16">
					<div>
						<h2 className="max-w-[17ch] text-[clamp(2.7rem,4.5vw,4.6rem)] !text-white">Make a difference today.</h2>
						<p className="mt-5 max-w-[55ch] text-lg text-[#e0ece1]">Your support can help us continue our mission of empowering children and transforming lives.</p>
					</div>
					<Button asChild size="lg" variant="secondary" className="h-12 w-fit rounded-full px-6 shadow-none"><Link to="/support">Support our cause <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link></Button>
				</div>
			</section>
		</div>
	);
}
