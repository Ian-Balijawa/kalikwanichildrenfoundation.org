import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Sample scholarship programs - replace with actual data
const scholarshipPrograms = [
	{
		id: 1,
		title: "Primary Education Scholarship",
		description:
			"Supporting primary school students with tuition, uniforms, and school supplies.",
		eligibility: [
			"Children aged 6-13 years",
			"Demonstrated financial need",
			"Resident of Busota or surrounding communities",
			"Strong academic potential",
		],
		coverage: ["School fees", "Uniforms and shoes", "Books and stationery", "School meals"],
		duration: "Full primary school cycle (P1-P7)",
	},
	{
		id: 2,
		title: "Secondary Education Scholarship",
		description:
			"Enabling talented students to continue their education through secondary school.",
		eligibility: [
			"Primary school graduates aged 13-18",
			"Minimum academic performance of 65%",
			"Demonstrated financial need",
			"Strong leadership potential",
		],
		coverage: [
			"School fees",
			"Uniforms and shoes",
			"Books and learning materials",
			"Boarding facilities where applicable",
		],
		duration: "Full secondary school cycle (S1-S6)",
	},
	{
		id: 3,
		title: "Vocational Training Scholarship",
		description:
			"Providing skills training opportunities for youth to gain practical job skills.",
		eligibility: [
			"Youth aged 16-24",
			"Basic literacy and numeracy skills",
			"Interest in vocational training",
			"Commitment to complete the program",
		],
		coverage: [
			"Training fees",
			"Tools and equipment",
			"Training materials",
			"Transportation allowance",
		],
		duration: "6-24 months depending on the program",
	},
];

const applicationSteps = [
	{
		step: 1,
		title: "Check Eligibility",
		description:
			"Review the eligibility criteria for your desired scholarship program to ensure you qualify.",
	},
	{
		step: 2,
		title: "Gather Documents",
		description:
			"Collect required documents including academic records, proof of residence, and financial information.",
	},
	{
		step: 3,
		title: "Submit Application",
		description:
			"Complete the online application form or visit our office to submit a physical application.",
	},
	{
		step: 4,
		title: "Interview",
		description:
			"Shortlisted candidates will be invited for an interview with our scholarship committee.",
	},
];

export default function Scholarship() {
	return (
		<div>
			{/* Hero Section */}
			<section className="bg-muted py-20">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-center mb-6">Scholarship Programs</h1>
					<p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
						We believe that education is a fundamental right. Our scholarship programs
						aim to remove financial barriers and provide quality education opportunities
						for deserving students.
					</p>
				</div>
			</section>

			{/* Scholarship Programs */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Available Programs</h2>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{scholarshipPrograms.map((program) => (
							<Card key={program.id} className="flex flex-col">
								<CardHeader>
									<CardTitle>{program.title}</CardTitle>
									<p className="text-muted-foreground mt-2">
										{program.description}
									</p>
								</CardHeader>
								<CardContent className="flex-1">
									<div className="mb-6">
										<h4 className="font-semibold mb-2">
											Eligibility Criteria:
										</h4>
										<ul className="list-disc pl-5 space-y-1 text-muted-foreground">
											{program.eligibility.map((item, index) => (
												<li key={index}>{item}</li>
											))}
										</ul>
									</div>
									<div className="mb-6">
										<h4 className="font-semibold mb-2">Coverage:</h4>
										<ul className="list-disc pl-5 space-y-1 text-muted-foreground">
											{program.coverage.map((item, index) => (
												<li key={index}>{item}</li>
											))}
										</ul>
									</div>
									<div>
										<h4 className="font-semibold mb-2">Duration:</h4>
										<p className="text-muted-foreground">{program.duration}</p>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Application Process */}
			<section className="py-20 bg-muted">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Application Process</h2>
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

			{/* Important Dates */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Important Dates</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
						<Card>
							<CardContent className="p-6">
								<h3 className="text-xl font-semibold mb-2">Application Opens</h3>
								<p className="text-primary">January 15, 2024</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<h3 className="text-xl font-semibold mb-2">Application Deadline</h3>
								<p className="text-primary">March 31, 2024</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<h3 className="text-xl font-semibold mb-2">Results Announcement</h3>
								<p className="text-primary">April 30, 2024</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-6">Ready to Apply?</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Take the first step towards your educational journey. Apply now or contact
						us for more information about our scholarship programs.
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
