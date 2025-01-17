import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const volunteerOpportunities = [
	{
		title: "Teaching and Mentoring",
		description:
			"Share your knowledge and skills with our students through teaching and mentoring programs.",
		commitment: "Flexible schedule, minimum 3 months",
		requirements: [
			"Teaching experience preferred",
			"Fluent in English",
			"Passion for education",
			"Cultural sensitivity",
		],
	},
	{
		title: "Community Development",
		description:
			"Support our community projects and help implement sustainable development initiatives.",
		commitment: "Part-time or full-time, minimum 1 month",
		requirements: [
			"Project management skills",
			"Community work experience",
			"Strong communication skills",
			"Team player",
		],
	},
	{
		title: "Healthcare Support",
		description:
			"Assist in providing basic healthcare services and health education to our beneficiaries.",
		commitment: "Full-time, minimum 2 months",
		requirements: [
			"Healthcare background",
			"First aid certification",
			"Experience working with children",
			"Health education skills",
		],
	},
];

const supportWays = [
	{
		title: "One-Time Donation",
		description:
			"Make a direct impact with a one-time contribution to support our programs and initiatives.",
		options: [
			"Education support",
			"Healthcare services",
			"Nutrition programs",
			"Infrastructure development",
		],
	},
	{
		title: "Monthly Giving",
		description:
			"Become a regular supporter and help us plan and sustain our long-term programs.",
		options: [
			"Child sponsorship",
			"Program sustainability",
			"Staff support",
			"Operational costs",
		],
	},
	{
		title: "In-Kind Donations",
		description:
			"Contribute essential items and resources that directly benefit our children and programs.",
		options: [
			"Educational materials",
			"Medical supplies",
			"Clothing and shoes",
			"Technology equipment",
		],
	},
];

const partnershipTypes = [
	{
		title: "Corporate Partnerships",
		description:
			"Partner with us to create meaningful social impact while achieving your CSR goals.",
		benefits: [
			"Customized partnership programs",
			"Impact reporting",
			"Brand visibility",
			"Employee engagement opportunities",
		],
	},
	{
		title: "Educational Institutions",
		description:
			"Collaborate with us to provide educational opportunities and cultural exchange programs.",
		benefits: [
			"Student volunteer programs",
			"Research opportunities",
			"Cultural exchange",
			"Knowledge sharing",
		],
	},
	{
		title: "NGO Collaborations",
		description: "Join forces with us to maximize impact and reach more beneficiaries.",
		benefits: ["Resource sharing", "Joint programs", "Knowledge exchange", "Extended reach"],
	},
];

export default function GetInvolved() {
	return (
		<div>
			{/* Hero Section */}
			<section className="bg-muted py-20">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-center mb-6">Get Involved</h1>
					<p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
						Join us in our mission to empower children and transform lives. There are
						many ways to contribute and make a difference in the lives of vulnerable
						children in Uganda.
					</p>
				</div>
			</section>

			{/* Volunteer Opportunities */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">
						Volunteer Opportunities
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{volunteerOpportunities.map((opportunity, index) => (
							<Card key={index}>
								<CardHeader>
									<CardTitle>{opportunity.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4">
										{opportunity.description}
									</p>
									<div className="mb-4">
										<p className="font-semibold mb-2">Time Commitment:</p>
										<p className="text-muted-foreground">
											{opportunity.commitment}
										</p>
									</div>
									<div>
										<p className="font-semibold mb-2">Requirements:</p>
										<ul className="list-disc list-inside text-muted-foreground space-y-1">
											{opportunity.requirements.map((req, reqIndex) => (
												<li key={reqIndex}>{req}</li>
											))}
										</ul>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
					<div className="text-center mt-8">
						<Link to="/volunteer">
							<Button size="lg">Apply to Volunteer</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Support Options */}
			<section className="py-20 bg-muted">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Ways to Support</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{supportWays.map((way, index) => (
							<Card key={index}>
								<CardHeader>
									<CardTitle>{way.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4">{way.description}</p>
									<div>
										<p className="font-semibold mb-2">Support Areas:</p>
										<ul className="list-disc list-inside text-muted-foreground space-y-1">
											{way.options.map((option, optionIndex) => (
												<li key={optionIndex}>{option}</li>
											))}
										</ul>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
					<div className="text-center mt-8">
						<Link to="/support">
							<Button size="lg">Make a Donation</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Partnership Opportunities */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">
						Partnership Opportunities
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{partnershipTypes.map((type, index) => (
							<Card key={index}>
								<CardHeader>
									<CardTitle>{type.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-4">{type.description}</p>
									<div>
										<p className="font-semibold mb-2">Partnership Benefits:</p>
										<ul className="list-disc list-inside text-muted-foreground space-y-1">
											{type.benefits.map((benefit, benefitIndex) => (
												<li key={benefitIndex}>{benefit}</li>
											))}
										</ul>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
					<div className="text-center mt-8">
						<Link to="/partnerships">
							<Button size="lg">Become a Partner</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Whether through volunteering, donating, or partnering, your support can help
						us create lasting positive change in the lives of vulnerable children.
					</p>
					<div className="flex justify-center gap-4">
						<Link to="/contact">
							<Button size="lg" variant="secondary">
								Contact Us
							</Button>
						</Link>
						<Link to="/support">
							<Button
								size="lg"
								variant="outline"
								className="bg-white/10 hover:bg-white/20"
							>
								Support Our Cause
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
