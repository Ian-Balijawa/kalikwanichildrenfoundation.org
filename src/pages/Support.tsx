import { useState } from "react";
import { ArrowUpRight, Check, Copy, Gift, HandHeart, HeartHandshake, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const accounts = [
	{ currency: "USD", number: "1160000013542", name: "Kalikwani Children's Home (KCH) Limited" },
	{ currency: "EUR", number: "11600000613440", name: "Kalikwani Children’s Home (KCH)" },
	{ currency: "UGX", number: "1160000013349", name: "Kalikwani Children’s Home (KCH)" },
];

const otherWays = [
	{ title: "Give supplies", description: "Donate supplies, equipment, or materials for our programs.", icon: Gift },
	{ title: "Partner with us", description: "Work with our team to support children and families in our community.", icon: HeartHandshake },
	{ title: "Fundraise", description: "Bring people together to support our cause.", icon: HandHeart },
	{ title: "Support sustainable work", description: "Help us grow projects that support our activities over time.", icon: Sprout },
];

export default function Support() {
	const [copied, setCopied] = useState<string | null>(null);
	const [copyError, setCopyError] = useState(false);

	async function copyNumber(currency: string, number: string) {
		try {
			await navigator.clipboard.writeText(number);
			setCopied(currency);
			setCopyError(false);
		} catch {
			setCopyError(true);
			setCopied(null);
		}
	}

	return (
		<div>
			<section className="bg-muted py-20">
				<div className="container mx-auto px-4">
					<h1 className="mb-6 text-center text-4xl font-bold">Support our cause</h1>
					<p className="mx-auto max-w-3xl text-center text-lg text-muted-foreground">Your generosity helps us empower children and communities through education, healthcare, and sustainable development. Thank you for making a difference.</p>
				</div>
			</section>

			<section className="bg-[#fffdf8]">
				<div className="container mx-auto">
					<div className="mb-10 max-w-2xl">
						<h2 className="text-3xl md:text-4xl">Donate by bank transfer</h2>
						<p className="mt-4 text-lg text-muted-foreground">Choose the account for your currency. All three accounts are held at Housing Finance Bank. If you need help with a transfer, please contact us.</p>
					</div>
					<div className="grid gap-5 lg:grid-cols-3">
						{accounts.map((account) => (
							<div key={account.currency} className="rounded-2xl border border-[#dce2d6] bg-white p-6 md:p-7">
								<h3 className="text-2xl">{account.currency} account</h3>
								<dl className="mt-7 space-y-5 text-sm">
									<div><dt className="font-semibold text-[#607466]">Bank</dt><dd className="mt-1 font-medium">Housing Finance Bank</dd></div>
									<div><dt className="font-semibold text-[#607466]">Account name</dt><dd className="mt-1 font-medium">{account.name}</dd></div>
									<div><dt className="font-semibold text-[#607466]">Customer number</dt><dd className="mt-1 font-medium tabular-nums">00132494</dd></div>
									<div><dt className="font-semibold text-[#607466]">Account number</dt><dd className="mt-1 break-all text-lg font-bold tabular-nums text-primary">{account.number}</dd></div>
								</dl>
								<Button variant="outline" className="mt-7 h-11 w-full rounded-full shadow-none" onClick={() => copyNumber(account.currency, account.number)} aria-label={`Copy ${account.currency} account number`}>
									{copied === account.currency ? <Check className="mr-2 h-4 w-4" aria-hidden="true" /> : <Copy className="mr-2 h-4 w-4" aria-hidden="true" />}
									{copied === account.currency ? "Copied" : "Copy account number"}
								</Button>
							</div>
						))}
					</div>
					<p aria-live="polite" className="mt-4 min-h-6 text-sm text-muted-foreground">{copyError ? "Copying is unavailable here. Select the account number above to copy it." : copied ? `${copied} account number copied.` : ""}</p>
				</div>
			</section>

			<section className="bg-muted">
				<div className="container mx-auto">
					<h2 className="mb-10 text-3xl md:text-4xl">Other ways to help</h2>
					<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
						{otherWays.map((way) => {
							const Icon = way.icon;
							return <div key={way.title} className="border-t border-[#c5d4c5] pt-5"><Icon className="mb-5 h-7 w-7 text-primary" strokeWidth={1.7} aria-hidden="true" /><h3 className="text-xl">{way.title}</h3><p className="mt-3 text-muted-foreground">{way.description}</p></div>;
						})}
					</div>
				</div>
			</section>

			<section className="bg-[#194a38] text-white">
				<div className="container mx-auto flex flex-col justify-between gap-8 md:flex-row md:items-center">
					<div><h2 className="text-3xl !text-white md:text-4xl">Questions about giving?</h2><p className="mt-3 max-w-xl text-lg text-[#dce9de]">We are here to help you make the most meaningful contribution possible.</p></div>
					<Button asChild variant="secondary" size="lg" className="h-12 w-fit rounded-full px-6 shadow-none"><Link to="/contact">Contact us <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link></Button>
				</div>
			</section>
		</div>
	);
}
