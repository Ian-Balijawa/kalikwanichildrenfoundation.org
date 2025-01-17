import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Sample partnership types - replace with actual data
const partnershipTypes = [
	{
		id: 1,
		title: "Corporate Partnerships",
		description:
			"Partner with us to make a lasting impact while fulfilling your corporate social responsibility goals.",
		benefits: [
			"Customized partnership programs",
			"Regular impact reports",
			"Employee engagement opportunities",
			"Brand visibility in our communications",
		],
		opportunities: [
			"Financial support for programs",
			"In-kind donations",
			"Skills-based volunteering",
			"Cause marketing campaigns",
		],
	},
	{
		id: 2,
		title: "Educational Institutions",
		description:
			"Collaborate with us to provide educational opportunities and cultural exchange programs.",
		benefits: [
			"Cross-cultural learning experiences",
			"Research opportunities",
			"Student internship programs",
			"Knowledge exchange",
		],
		opportunities: [
			"Student exchange programs",
			"Joint research projects",
			"Teaching partnerships",
			"Resource sharing",
		],
	},
	{
		id: 3,
		title: "NGO Collaborations",
		description:
			"Join forces with us to amplify our impact and reach more communities in need.",
		benefits: [
			"Shared resources and expertise",
			"Increased program reach",
			"Knowledge sharing",
			"Joint funding opportunities",
		],
		opportunities: [
			"Joint program implementation",
			"Resource pooling",
			"Capacity building",
			"Advocacy initiatives",
		],
	},
];

// Sample current partners - replace with actual data
const currentPartners = [
	{
		id: 1,
		name: "Global Education Initiative",
		type: "NGO",
		country: "United States",
		logo: "/images/partners/gei-logo.png",
		description: "Supporting our educational programs since 2020.",
	},
	{
		id: 2,
		name: "Green Farms International",
		type: "Corporate",
		country: "Netherlands",
		logo: "/images/partners/gfi-logo.png",
		description: "Providing agricultural expertise and resources.",
	},
	{
		id: 3,
		name: "Makerere University",
		type: "Educational",
		country: "Uganda",
		logo: "/images/partners/mu-logo.png",
		description: "Academic partnership for research and student engagement.",
	},
	{
		id: 4,
		name: "Health Bridge Foundation",
		type: "NGO",
		country: "Canada",
		logo: "/images/partners/hbf-logo.png",
		description: "Supporting our community health initiatives.",
	},
];

const impactMetrics = [
	{
		metric: "15+",
		label: "Active Partners",
	},
	{
		metric: "5",
		label: "Countries",
	},
	{
		metric: "1000+",
		label: "Lives Impacted",
	},
	{
		metric: "25+",
		label: "Joint Projects",
	},
];

export default function Partnerships() {
	return (
		<div>
			{/* Hero Section */}
			<section className="bg-muted py-20">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-center mb-6">
						Partnership Opportunities
					</h1>
					<p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
						Join us in creating sustainable change through meaningful partnerships.
						Together, we can amplify our impact and reach more communities in need.
					</p>
				</div>
			</section>

			{/* Impact Metrics */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						{impactMetrics.map((item, index) => (
							<Card key={index}>
								<CardContent className="p-6 text-center">
									<p className="text-4xl font-bold text-primary mb-2">
										{item.metric}
									</p>
									<p className="text-muted-foreground">{item.label}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Partnership Types */}
			<section className="py-20 bg-muted">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Ways to Partner</h2>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{partnershipTypes.map((type) => (
							<Card key={type.id} className="flex flex-col">
								<CardHeader>
									<CardTitle>{type.title}</CardTitle>
									<p className="text-muted-foreground mt-2">{type.description}</p>
								</CardHeader>
								<CardContent className="flex-1">
									<div className="mb-6">
										<h4 className="font-semibold mb-2">Benefits:</h4>
										<ul className="list-disc pl-5 space-y-1 text-muted-foreground">
											{type.benefits.map((benefit, index) => (
												<li key={index}>{benefit}</li>
											))}
										</ul>
									</div>
									<div>
										<h4 className="font-semibold mb-2">Opportunities:</h4>
										<ul className="list-disc pl-5 space-y-1 text-muted-foreground">
											{type.opportunities.map((opportunity, index) => (
												<li key={index}>{opportunity}</li>
											))}
										</ul>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Current Partners */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{currentPartners.map((partner) => (
							<Card key={partner.id}>
								<CardContent className="p-6">
									<div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
										{/* Replace with actual image component */}
										<div
											className="w-full h-full bg-contain bg-center bg-no-repeat"
											style={{ backgroundImage: `url(${partner.logo})` }}
										/>
									</div>
									<h3 className="text-xl font-semibold mb-1">{partner.name}</h3>
									<p className="text-sm text-muted-foreground mb-2">
										{partner.type} • {partner.country}
									</p>
									<p className="text-muted-foreground">{partner.description}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Partnership Process */}
			<section className="py-20 bg-muted">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Partnership Process</h2>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
						<Card>
							<CardContent className="p-6">
								<div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">
									1
								</div>
								<h3 className="text-xl font-semibold mb-2">Initial Contact</h3>
								<p className="text-muted-foreground">
									Reach out to discuss your interests and explore potential
									collaboration areas.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">
									2
								</div>
								<h3 className="text-xl font-semibold mb-2">Assessment</h3>
								<p className="text-muted-foreground">
									We evaluate alignment of goals and resources to identify the
									best partnership model.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">
									3
								</div>
								<h3 className="text-xl font-semibold mb-2">Planning</h3>
								<p className="text-muted-foreground">
									Develop a detailed partnership plan including goals, activities,
									and timelines.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">
									4
								</div>
								<h3 className="text-xl font-semibold mb-2">Implementation</h3>
								<p className="text-muted-foreground">
									Launch the partnership with regular monitoring and evaluation of
									impact.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-6">Become a Partner</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Ready to make a difference? Let's discuss how we can work together to create
						lasting positive change in our communities.
					</p>
					<div className="flex justify-center gap-4">
						<Button size="lg" variant="secondary">
							Partner With Us
						</Button>
						<Link to="/contact">
							<Button
								size="lg"
								variant="outline"
								className="bg-white/10 hover:bg-white/20"
							>
								Contact Us
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
