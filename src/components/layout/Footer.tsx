import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const explore = [
	{ label: "About us", to: "/about" },
	{ label: "Our programs", to: "/programs" },
	{ label: "Projects", to: "/projects" },
	{ label: "Gallery", to: "/gallery" },
	{ label: "Education support", to: "/scholarship" },
];

const participate = [
	{ label: "Donate", to: "/support" },
	{ label: "Volunteer", to: "/volunteer" },
	{ label: "Partnerships", to: "/partnerships" },
	{ label: "Contact", to: "/contact" },
];

export function Footer() {
	return (
		<footer className="bg-[#123b2d] text-[#e4eee5]">
			<div className="container mx-auto grid gap-11 py-16 md:grid-cols-[1.4fr_.8fr_.8fr_1.1fr] md:gap-8 md:py-20">
				<div>
					<Link to="/" className="inline-flex items-center gap-3">
						<img src="/logo.png" alt="" className="h-14 w-14 rounded-full bg-white object-contain p-1" />
						<span className="font-serif text-2xl font-bold leading-tight text-white">Kalikwani<br /><span className="text-base">Children’s Support Centre</span></span>
					</Link>
					<p className="mt-5 max-w-[33ch] text-sm leading-7 text-[#c7dacd]">Dedicated to empowering children and transforming lives through education, support, and community development.</p>
				</div>
				<div>
					<h2 className="mb-5 !font-sans !text-sm !font-semibold !tracking-[.08em] !text-white">EXPLORE</h2>
					<ul className="space-y-3 text-sm">{explore.map((item) => <li key={item.to}><Link to={item.to}>{item.label}</Link></li>)}</ul>
				</div>
				<div>
					<h2 className="mb-5 !font-sans !text-sm !font-semibold !tracking-[.08em] !text-white">TAKE PART</h2>
					<ul className="space-y-3 text-sm">{participate.map((item) => <li key={item.to}><Link to={item.to}>{item.label}</Link></li>)}</ul>
				</div>
				<div>
					<h2 className="mb-5 !font-sans !text-sm !font-semibold !tracking-[.08em] !text-white">GET IN TOUCH</h2>
					<ul className="space-y-4 text-sm leading-6">
						<li className="flex gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" /><span>Busota, Kamuli Municipality, Uganda</span></li>
						<li><a className="flex gap-3" href="tel:+256767241074"><Phone className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />+256 767 241 074</a></li>
						<li><a className="flex gap-3 break-all" href="mailto:kalikwani.csc2024@gmail.com"><Mail className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />kalikwani.csc2024@gmail.com</a></li>
						<li><a className="inline-flex items-center gap-1 border-b border-[#bed4c0] pb-1 font-semibold" href="https://wa.me/256767241074" target="_blank" rel="noopener noreferrer">Message on WhatsApp <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a></li>
					</ul>
				</div>
			</div>
			<div className="border-t border-white/15">
				<div className="container mx-auto flex flex-wrap justify-between gap-3 py-6 text-xs text-[#b8d0bd]"><span>© {new Date().getFullYear()} Kalikwani Children’s Support Centre.</span><span>Made for every child’s brighter future.</span></div>
			</div>
		</footer>
	);
}
