import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const programs = [
	{
		title: "Education Initiative",
		description:
			"Our comprehensive education program provides support to deserving beneficiaries through scholarships, educational materials, and mentoring.",
		stats: [
			{ label: "Students Supported", value: "45+" },
			{ label: "Partner Schools", value: "8" },
			{ label: "Success Rate", value: "90%" },
		],
		features: [
			"Full and partial scholarships",
			"Educational materials and supplies",
			"Mentoring and tutoring support",
			"School partnerships",
			"International volunteer teachers",
		],
	},
	{
		title: "Sustainable Farming",
		description:
			"Our farming projects generate income to support the organization's activities while promoting sustainable agriculture practices.",
		stats: [
			{ label: "Active Projects", value: "3" },
			{ label: "Beneficiaries", value: "20+" },
			{ label: "Revenue Generated", value: "15%" },
		],
		features: [
			"Piggery farming",
			"Poultry farming (upcoming)",
			"Goat rearing (upcoming)",
			"Agricultural training",
			"Community involvement",
		],
	},
	{
		title: "International Exchange",
		description:
			"We connect global volunteers with local communities to share knowledge, skills, and cultural experiences.",
		stats: [
			{ label: "Volunteers Hosted", value: "5+" },
			{ label: "Countries", value: "3" },
			{ label: "Projects", value: "4" },
		],
		features: [
			"Teaching opportunities",
			"Cultural exchange",
			"Community development",
			"Skills training",
			"Global networking",
		],
	},
];

const targetGroups = [
	{
		title: "Vulnerable Teenagers",
		description:
			"Supporting teenagers aged 13-17 who face challenges that impact their well-being, safety, or development.",
		challenges: [
			"Economic hardships",
			"Family instability",
			"Lack of educational opportunities",
			"Mental health issues",
			"Social discrimination",
		],
	},
	{
		title: "Children from Marginalized Families",
		description:
			"Helping children who are excluded from society due to various socio-economic factors.",
		challenges: [
			"Poverty",
			"Lack of education",
			"Health inequalities",
			"Child labor risks",
			"Limited social support",
		],
	},
	{
		title: "Homeless Children",
		description:
			"Providing support to children who lack fixed, regular, and adequate nighttime residence.",
		challenges: [
			"Lack of shelter",
			"Food insecurity",
			"Health concerns",
			"Educational disruption",
			"Safety risks",
		],
	},
];

export default function Programs() {
	return (
		<div>
			{/* Hero Section */}
			<section className="bg-muted py-20">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-center mb-6">Our Programs</h1>
					<p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
						Through our diverse range of programs, we work to create lasting positive
						change in the lives of vulnerable children and teenagers in Kamuli, Uganda.
					</p>
				</div>
			</section>

			{/* Main Programs */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="space-y-20">
						{programs.map((program, index) => (
							<div
								key={index}
								className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
							>
								<div className={index % 2 === 1 ? "md:order-2" : ""}>
									<h2 className="text-3xl font-bold mb-6">{program.title}</h2>
									<p className="text-lg text-muted-foreground mb-8">
										{program.description}
									</p>
									<div className="grid grid-cols-3 gap-4 mb-8">
										{program.stats.map((stat, statIndex) => (
											<div key={statIndex} className="text-center">
												<div className="text-2xl font-bold text-primary mb-2">
													{stat.value}
												</div>
												<div className="text-sm text-muted-foreground">
													{stat.label}
												</div>
											</div>
										))}
									</div>
									<ul className="space-y-2 mb-8">
										{program.features.map((feature, featureIndex) => (
											<li key={featureIndex} className="flex items-center">
												<span className="mr-2">•</span>
												<span className="text-muted-foreground">
													{feature}
												</span>
											</li>
										))}
									</ul>
									<Link to="/get-involved">
										<Button>Get Involved</Button>
									</Link>
								</div>
								<div
									className={`bg-muted rounded-lg h-[400px] ${
										index % 2 === 1 ? "md:order-1" : ""
									}`}
								>
									{/* Placeholder for program image */}
									<div className="w-full h-full flex items-center justify-center text-muted-foreground">
										Program Image
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Target Groups */}
			<section className="py-20 bg-muted">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Who We Help</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{targetGroups.map((group, index) => (
							<Card key={index}>
								<CardHeader>
									<CardTitle>{group.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-6">
										{group.description}
									</p>
									<h4 className="font-semibold mb-3">Key Challenges:</h4>
									<ul className="space-y-2">
										{group.challenges.map((challenge, challengeIndex) => (
											<li key={challengeIndex} className="flex items-center">
												<span className="mr-2">•</span>
												<span className="text-muted-foreground">
													{challenge}
												</span>
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-6">Support Our Programs</h2>
					<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
						Your support enables us to continue and expand our programs, reaching more
						children and creating lasting positive change in their lives.
					</p>
					<div className="flex justify-center gap-4">
						<Link to="/support">
							<Button size="lg">Donate Now</Button>
						</Link>
						<Link to="/volunteer">
							<Button size="lg" variant="outline">
								Volunteer With Us
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
