import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Sample donation options - replace with actual data
const donationOptions = [
	{
		id: 1,
		title: "One-Time Donation",
		description: "Make a single contribution to support our programs and initiatives.",
		benefits: [
			"Immediate impact on our programs",
			"Tax-deductible donation receipt",
			"Impact report on how your donation was used",
			"Recognition on our donor wall (optional)",
		],
		suggested: ["$50", "$100", "$250", "$500", "Custom Amount"],
	},
	{
		id: 2,
		title: "Monthly Giving",
		description: "Become a sustaining donor with a recurring monthly contribution.",
		benefits: [
			"Sustained support for long-term programs",
			"Quarterly impact reports",
			"Special recognition in our annual report",
			"Exclusive updates from the field",
		],
		suggested: ["$25/month", "$50/month", "$100/month", "$200/month", "Custom Amount"],
	},
	{
		id: 3,
		title: "Sponsor a Child",
		description: "Provide comprehensive support for a child's education and well-being.",
		benefits: [
			"Regular updates about your sponsored child",
			"Direct correspondence with the child",
			"Annual progress report",
			"Visit opportunities",
		],
		suggested: ["$35/month", "$50/month", "$75/month", "Custom Amount"],
	},
];

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
			{/* Hero Section */}
			<section className="bg-muted py-20">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-center mb-6">Support Our Cause</h1>
					<p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
						Your support enables us to continue our mission of empowering children and
						communities through education, healthcare, and sustainable development.
					</p>
				</div>
			</section>

			{/* Donation Options */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Ways to Give</h2>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{donationOptions.map((option) => (
							<Card key={option.id} className="flex flex-col">
								<CardHeader>
									<CardTitle>{option.title}</CardTitle>
									<p className="text-muted-foreground mt-2">
										{option.description}
									</p>
								</CardHeader>
								<CardContent className="flex-1">
									<div className="mb-6">
										<h4 className="font-semibold mb-2">Benefits:</h4>
										<ul className="list-disc pl-5 space-y-1 text-muted-foreground">
											{option.benefits.map((benefit, index) => (
												<li key={index}>{benefit}</li>
											))}
										</ul>
									</div>
									<div>
										<h4 className="font-semibold mb-2">Suggested Amounts:</h4>
										<div className="grid grid-cols-2 gap-2">
											{option.suggested.map((amount, index) => (
												<Button
													key={index}
													variant={
														index === option.suggested.length - 1
															? "outline"
															: "secondary"
													}
													className="w-full"
												>
													{amount}
												</Button>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Impact Section */}
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

			{/* Other Ways to Support */}
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

			{/* Tax Information */}
			<section className="py-20 bg-muted">
				<div className="container mx-auto px-4 max-w-4xl text-center">
					<h2 className="text-3xl font-bold mb-6">Tax Information</h2>
					<p className="text-lg text-muted-foreground mb-8">
						Kalikwani Children's Foundation is a registered non-profit organization. All
						donations are tax-deductible to the extent allowed by law. You will receive
						a tax receipt for your donation.
					</p>
					<div className="bg-background p-6 rounded-lg">
						<p className="font-medium mb-2">Bank Transfer Details:</p>
						<p className="text-muted-foreground">
							Bank: Centenary Bank
							<br />
							Account Name: Kalikwani Children's Foundation
							<br />
							Account Number: XXXX-XXXX-XXXX-XXXX
							<br />
							Swift Code: XXXXXXXXX
						</p>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-6">Questions About Giving?</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Our team is here to help you make the most meaningful contribution possible.
						Contact us to discuss your giving options.
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
