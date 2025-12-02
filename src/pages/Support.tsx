import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const impactExamples = [
	{
		amount: "$25",
		impact: "Provides school supplies for one student for a term",
	},
	{
		amount: "$50",
		impact: "Supplies seeds and tools for a family's farm plot",
	},
	{
		amount: "$100",
		impact: "Covers one month of primary school education for two children",
	},
	{
		amount: "$250",
		impact: "Funds medical supplies for our community health outreach",
	},
	{
		amount: "$500",
		impact: "Supports teacher training for one school term",
	},
	{
		amount: "$1000",
		impact: "Helps construct a classroom or community facility",
	},
];

const otherWaysToSupport = [
	{
		title: "In-Kind Donations",
		description: "Donate supplies, equipment, or materials for our programs.",
		icon: "📦",
	},
	{
		title: "Corporate Matching",
		description: "Double your impact through your employer's matching gift program.",
		icon: "🤝",
	},
	{
		title: "Legacy Giving",
		description: "Include KCF in your estate planning to create lasting change.",
		icon: "🌱",
	},
	{
		title: "Fundraise for Us",
		description: "Start your own fundraising campaign to support our cause.",
		icon: "💝",
	},
];

export default function Support() {
	return (
		<div>
			<section className="bg-muted py-20">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-center mb-6">Donate</h1>
					<p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
						Your generosity helps us empower children and communities through education,
						healthcare, and sustainable development. Thank you for making a difference.
					</p>
				</div>
			</section>

			<section className="py-20">
				<div className="container mx-auto px-4 max-w-4xl">
					<h2 className="text-3xl font-bold text-center mb-12">How to Donate</h2>

					<Card>
						<CardHeader>
							<CardTitle>Bank Transfer Details</CardTitle>
						</CardHeader>

						<CardContent className="space-y-8">
							<div className="p-4 bg-muted rounded-lg">
								<h3 className="text-xl font-semibold mb-4">USD Account</h3>
								<ul className="space-y-2 text-muted-foreground">
									<li><strong>Bank:</strong> Housing Finance Bank</li>
									<li><strong>Customer Number:</strong> 00132494</li>
									<li><strong>Account Name:</strong> Kalikwani Children's Home (KCH) Limited</li>
									<li><strong>Account Number:</strong> 1160000013542</li>
								</ul>
							</div>

							<div className="p-4 bg-muted rounded-lg">
								<h3 className="text-xl font-semibold mb-4">EURO Account</h3>
								<ul className="space-y-2 text-muted-foreground">
									<li><strong>Bank:</strong> Housing Finance Bank</li>
									<li><strong>Customer Number:</strong> 00132494</li>
									<li><strong>Account Name:</strong> Kalikwani Children’s Home (KCH)</li>
									<li><strong>Account Number:</strong> 11600000613440</li>
								</ul>
							</div>

							<div className="p-4 bg-muted rounded-lg">
								<h3 className="text-xl font-semibold mb-4">UGX Account</h3>
								<ul className="space-y-2 text-muted-foreground">
									<li><strong>Bank:</strong> Housing Finance Bank</li>
									<li><strong>Customer Number:</strong> 00132494</li>
									<li><strong>Account Name:</strong> Kalikwani Children’s Home (KCH)</li>
									<li><strong>Account Number:</strong> 1160000013349</li>
								</ul>
							</div>

							<p className="text-sm text-center text-muted-foreground pt-4">
								Thank you for your generosity. Every contribution helps transform lives.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>

			<section className="py-20 bg-muted">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Your Impact</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{impactExamples.map((example, index) => (
							<Card key={index}>
								<CardContent className="p-6">
									<p className="text-3xl font-bold text-primary mb-2">
										{example.amount}
									</p>
									<p className="text-muted-foreground">{example.impact}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Other Ways to Support</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{otherWaysToSupport.map((way, index) => (
							<Card key={index}>
								<CardContent className="p-6">
									<div className="text-4xl mb-4">{way.icon}</div>
									<h3 className="text-xl font-semibold mb-2">{way.title}</h3>
									<p className="text-muted-foreground">{way.description}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			<section className="py-20 bg-muted">
				<div className="container mx-auto px-4 max-w-4xl text-center">
					<h2 className="text-3xl font-bold mb-6">Tax Information</h2>
					<p className="text-lg text-muted-foreground mb-8">
						Kalikwani Children's Foundation is a registered non-profit organization.
						All donations are tax-deductible where applicable. A receipt will be provided.
					</p>
				</div>
			</section>

			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-6">Questions About Giving?</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						We are here to help you make the most meaningful contribution possible.
						Reach out with any questions.
					</p>
					<div className="flex justify-center gap-4">
						<Link to="/contact">
							<Button size="lg" variant="secondary">
								Contact Us
							</Button>
						</Link>
						<Button
							size="lg"
							variant="outline"
							className="bg-white/10 hover:bg-white/20"
						>
							Download Annual Report
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
