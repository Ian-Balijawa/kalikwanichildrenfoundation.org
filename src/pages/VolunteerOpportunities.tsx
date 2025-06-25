import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Sample volunteer opportunities - replace with actual data
const opportunities = [
	{
		id: 1,
		title: "Teaching Assistant",
		category: "Education",
		commitment: "3-6 months",
		schedule: "Monday to Friday, 8 AM - 4 PM",
		location: "Royal College Kamuli",
		description:
			"Support teachers in classroom activities, assist with lesson planning, and help students with their studies.",
		requirements: [
			"Teaching experience or education background",
			"Fluent in English",
			"Patient and good with children",
			"Minimum 3-month commitment",
		],
		responsibilities: [
			"Assist teachers with classroom management",
			"Help prepare teaching materials",
			"Provide one-on-one support to students",
			"Participate in after-school programs",
		],
	},
	{
		id: 2,
		title: "Community Health Worker",
		category: "Healthcare",
		commitment: "2-6 months",
		schedule: "Flexible, 30 hours per week",
		location: "Busota Community",
		description:
			"Work with our health team to provide basic healthcare education and support to community members.",
		requirements: [
			"Healthcare background or relevant experience",
			"Basic medical knowledge",
			"Good communication skills",
			"Cultural sensitivity",
		],
		responsibilities: [
			"Conduct health education sessions",
			"Assist in health screenings",
			"Support community health initiatives",
			"Maintain health records",
		],
	},
	{
		id: 3,
		title: "Agricultural Project Assistant",
		category: "Farming",
		commitment: "3-12 months",
		schedule: "Monday to Saturday, flexible hours",
		location: "KCF Farm Projects",
		description:
			"Support our sustainable farming initiatives and help train community members in modern agricultural practices.",
		requirements: [
			"Agricultural knowledge or experience",
			"Physical fitness",
			"Ability to work outdoors",
			"Interest in sustainable farming",
		],
		responsibilities: [
			"Assist in farm management",
			"Train community members",
			"Monitor crop growth",
			"Support marketing of produce",
		],
	},
];

const benefits = [
	{
		title: "Cultural Immersion",
		description:
			"Experience authentic Ugandan culture and community life while making a meaningful impact.",
	},
	{
		title: "Professional Development",
		description:
			"Gain valuable experience in international development and cross-cultural communication.",
	},
	{
		title: "Accommodation",
		description:
			"Safe and comfortable housing provided within the community for long-term volunteers.",
	},
	{
		title: "Support System",
		description:
			"Dedicated staff to help you adjust and make the most of your volunteer experience.",
	},
];

const applicationSteps = [
	{
		step: 1,
		title: "Review Opportunities",
		description:
			"Browse available positions and find the one that matches your skills and interests.",
	},
	{
		step: 2,
		title: "Submit Application",
		description:
			"Fill out our online application form with your details and preferred volunteer position.",
	},
	{
		step: 3,
		title: "Interview",
		description:
			"Have a video call with our volunteer coordinator to discuss your application and expectations.",
	},
	{
		step: 4,
		title: "Preparation",
		description:
			"If accepted, receive orientation materials and prepare for your volunteer experience.",
	},
];

export default function VolunteerOpportunities() {
	return (
		<div>
			{/* Hero Section */}
			<section className="bg-muted py-20">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-center mb-6">Volunteer Opportunities</h1>
					<p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
						Join our team of dedicated volunteers and make a lasting impact in the
						Busota community. We offer various opportunities to contribute your skills
						and time to meaningful projects.
					</p>
				</div>
			</section>

			{/* Current Opportunities */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Current Opportunities</h2>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{opportunities.map((opportunity) => (
							<Card key={opportunity.id} className="flex flex-col">
								<CardHeader>
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium text-primary">
											{opportunity.category}
										</span>
										<span className="text-sm text-muted-foreground">
											{opportunity.commitment}
										</span>
									</div>
									<CardTitle className="mb-2">{opportunity.title}</CardTitle>
									<p className="text-sm text-muted-foreground">
										📍 {opportunity.location}
									</p>
									<p className="text-sm text-muted-foreground">
										🕒 {opportunity.schedule}
									</p>
								</CardHeader>
								<CardContent className="flex-1">
									<p className="text-muted-foreground mb-6">
										{opportunity.description}
									</p>
									<div className="mb-6">
										<h4 className="font-semibold mb-2">Requirements:</h4>
										<ul className="list-disc pl-5 space-y-1 text-muted-foreground">
											{opportunity.requirements.map((req, index) => (
												<li key={index}>{req}</li>
											))}
										</ul>
									</div>
									<div>
										<h4 className="font-semibold mb-2">Responsibilities:</h4>
										<ul className="list-disc pl-5 space-y-1 text-muted-foreground">
											{opportunity.responsibilities.map((resp, index) => (
												<li key={index}>{resp}</li>
											))}
										</ul>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Benefits */}
			<section className="py-20 bg-muted">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Volunteer Benefits</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{benefits.map((benefit, index) => (
							<Card key={index}>
								<CardContent className="pt-6">
									<h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
									<p className="text-muted-foreground">{benefit.description}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Application Process */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">How to Apply</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{applicationSteps.map((step) => (
							<Card key={step.step}>
								<CardContent className="pt-6">
									<div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">
										{step.step}
									</div>
									<h3 className="text-xl font-semibold mb-2">{step.title}</h3>
									<p className="text-muted-foreground">{step.description}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="py-20 bg-muted">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">
						Frequently Asked Questions
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
						<Card>
							<CardContent className="p-6">
								<h3 className="text-xl font-semibold mb-2">Do I need a visa?</h3>
								<p className="text-muted-foreground">
									Yes, volunteers need to obtain a tourist or volunteer visa
									before arriving in Uganda. We will provide guidance on the visa
									application process.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<h3 className="text-xl font-semibold mb-2">
									Is accommodation provided?
								</h3>
								<p className="text-muted-foreground">
									Yes, we provide safe and comfortable accommodation for long-term
									volunteers within the community.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<h3 className="text-xl font-semibold mb-2">What about meals?</h3>
								<p className="text-muted-foreground">
									Basic meals are provided for volunteers staying in our
									accommodation. Special dietary requirements can be accommodated
									with advance notice.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<h3 className="text-xl font-semibold mb-2">
									Is there an application fee?
								</h3>
								<p className="text-muted-foreground">
									No, there is no application fee. However, volunteers are
									responsible for their travel expenses and visa costs.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Take the first step towards an enriching volunteer experience. Apply now or
						contact us to learn more about our volunteer opportunities.
					</p>
					<div className="flex justify-center gap-4">
						<Button size="lg" variant="secondary">
							Apply Now
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
