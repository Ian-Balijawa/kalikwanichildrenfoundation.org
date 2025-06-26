import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Link } from "react-router-dom";

// Sample projects data - replace with actual data
const projects = [
	{
		id: 1,
		title: "Decagon Family Homes Project",
		category: "Housing",
		status: "Planning",
		startDate: "January 2025",
		endDate: "Ongoing",
		location: "Kamuli, Uganda (0°51'38.67\" N  33°03'26.63\" E)",
		description:
			"A revolutionary approach to orphan care, transforming the traditional orphanage model into a true family environment. Currently supporting 45 children aged 2-17, we're building a unique decagon-shaped complex of 10 family homes integrated with the innovative Village Hub project to provide genuine family structures rather than institutional care.",
		impact: "Will provide family-style homes for 50 children and 10 house mothers while establishing a community-based social protection system",
		budget: "$1,700,655.00 (6,270,502,185 UGX)",
		progress: 15,
		images: ["/image1.png", "/image2.png", "/image3.png", "/image4.png", "/image5.png"],
		details: {
			concept:
				"Each home is designed to house one house mother with 5 children of different ages, creating a genuine family unit rather than an institutional environment. The project includes the Village Hub initiative to strengthen community services and support.",
			features: [
				"Ten individual family-style homes arranged in a decagon",
				"Three floors per unit with dedicated family spaces",
				"Shared courtyard for community activities",
				"Private bedrooms and family living areas",
				"Individual kitchens and bathrooms per family unit",
				"Recreation spaces and study areas",
				"Sustainable facilities including solar water heaters and RO system",
				"Village Hub community support center",
			],
			costs: [
				{ item: "Construction", amount: "$1,658,101.00" },
				{ item: "Land Acquisition", amount: "$13,554.00" },
				{ item: "Furniture and Equipment", amount: "$30,000.00" },
			],
			familyStructure: [
				"One house mother caring for 5 children",
				"Children of varying ages (18 months apart)",
				"Weekly visits from assigned father figure",
				"Private family dining and living spaces",
				"Integrated community activities",
			],
			philosophy:
				"Our approach moves away from traditional orphanage models to create real family units while building a community-based social protection system. Children will never have to identify as orphans, but as members of loving, supportive families within a strong community framework.",
		},
		updates: [
			{
				date: "January 2024",
				title: "Land Acquired",
				description:
					"Secured 4.5 acres of land for the project, close to our existing pig farm.",
			},
		],
		contractor: "Kasthew Construction UG Ltd. (www.kasthew-construction.com)",
	},
	{
		id: 2,
		title: "Oven Flair Project",
		category: "Community",
		status: "Ongoing",
		startDate: "2024",
		endDate: "Ongoing",
		location: "Kamuli, Uganda",
		description:
			"A transformative initiative providing energy-efficient ovens to poor families, reducing smoke-related health risks and deforestation while promoting dignity and environmental sustainability.",
		impact: "Reducing deforestation by 60% per household, preventing smoke-related illnesses, and supporting education",
		budget: "UGX 100,000 per oven (€30.00 or CAD40.00)",
		progress: 25,
		images: ["/image6.png"],
		details: {
			concept:
				"Providing affordable, efficient ovens to families while creating a sustainable cycle of environmental protection and community support.",
			features: [
				"Energy-efficient oven burners saving 60% of wood consumption",
				"Smoke-free cooking environment",
				"Affordable pricing model (10% cost to recipients)",
				"Tree planting initiative",
				"Education fund support",
			],
			costs: [
				{ item: "Oven burner", amount: "UGX 100,000" },
				{ item: "Tree planting contribution", amount: "UGX 5,000" },
				{ item: "Education fund contribution", amount: "UGX 5,000" },
			],
			impact: [
				"Reduced smoke-related health risks",
				"Decreased deforestation",
				"Improved family dignity",
				"Support for education",
				"Environmental conservation",
			],
			philosophy:
				"By providing efficient ovens at a dignified price point, we help families protect their health, preserve the environment, and maintain their self-respect while contributing to education and reforestation efforts.",
		},
		updates: [
			{
				date: "2024",
				title: "First Donation Received",
				description: "Received our first donation from a 9-year-old supporter from Malta.",
			},
		],
		videoUrl: "https://youtu.be/1WAkx8F5HVs?si=d0eHG0Hr53PGy-l_",
	},
	{
		id: 3,
		title: "Busota Primary School Construction",
		category: "Education",
		status: "Ongoing",
		startDate: "January 2024",
		endDate: "December 2024",
		location: "Busota Village",
		description:
			"Construction of a new primary school building with 8 classrooms, a library, and administrative offices.",
		impact: "Will provide quality education facilities for 500 students",
		budget: "€101,000",
		progress: 35,
		images: ["/images/IMG-20250123-WA0131.jpg", "/images/IMG-20250123-WA0130.jpg"],
		updates: [
			{
				date: "March 15, 2024",
				title: "Foundation Complete",
				description:
					"The foundation work has been completed and wall construction has begun.",
			},
		],
	},
	{
		id: 4,
		title: "Community Farm Initiative",
		category: "Agriculture",
		status: "Ongoing",
		startDate: "October 2023",
		endDate: "Ongoing",
		location: "Busota Community",
		description:
			"Sustainable farming project teaching modern agricultural techniques and providing food security.",
		impact: "Supporting 50 families with food and income",
		budget: "$75,000",
		progress: 70,
		images: ["/images/IMG-20250123-WA0129.jpg", "/images/IMG-20250123-WA0128.jpg"],
		updates: [
			{
				date: "February 2024",
				title: "First Harvest Complete",
				description: "Successfully completed first harvest of maize and vegetables.",
			},
		],
	},
	{
		id: 5,
		title: "Healthcare Outreach Program",
		category: "Healthcare",
		status: "Completed",
		startDate: "June 2023",
		endDate: "December 2023",
		location: "Multiple Villages",
		description:
			"Mobile health clinics providing basic healthcare services and health education.",
		impact: "Served over 2,000 community members",
		budget: "$0",
		progress: 0,
		images: ["/images/IMG-20250123-WA0127.jpg", "/images/IMG-20250123-WA0126.jpg"],
		updates: [
			{
				date: "December 2023",
				title: "Program Completion",
				description:
					"Successfully concluded the healthcare outreach program, exceeding target beneficiaries.",
			},
		],
	},
];

const categories = ["All", "Education", "Agriculture", "Healthcare", "Infrastructure", "Housing"];
const statuses = ["All", "Ongoing", "Completed", "Planning"];

export default function Projects() {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedStatus, setSelectedStatus] = useState("All");

	const filteredProjects = projects.filter((project) => {
		const categoryMatch = selectedCategory === "All" || project.category === selectedCategory;
		const statusMatch = selectedStatus === "All" || project.status === selectedStatus;
		return categoryMatch && statusMatch;
	});

	return (
		<div>
			{/* Hero Section */}
			<section className="bg-muted py-20">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-center mb-6">Our Projects</h1>
					<p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
						Explore our ongoing and completed projects that are transforming lives and
						building stronger communities in Kamuli, Uganda.
					</p>
				</div>
			</section>

			{/* Filters */}
			<section className="py-8 border-b">
				<div className="container mx-auto px-4">
					<div className="flex flex-col md:flex-row gap-4 justify-center items-center">
						<div className="w-full md:w-48">
							<Select value={selectedCategory} onValueChange={setSelectedCategory}>
								<SelectTrigger>
									<SelectValue placeholder="Select Category" />
								</SelectTrigger>
								<SelectContent>
									{categories.map((category) => (
										<SelectItem key={category} value={category}>
											{category}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="w-full md:w-48">
							<Select value={selectedStatus} onValueChange={setSelectedStatus}>
								<SelectTrigger>
									<SelectValue placeholder="Select Status" />
								</SelectTrigger>
								<SelectContent>
									{statuses.map((status) => (
										<SelectItem key={status} value={status}>
											{status}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<Button
							variant="outline"
							onClick={() => {
								setSelectedCategory("All");
								setSelectedStatus("All");
							}}
						>
							Reset Filters
						</Button>
					</div>
				</div>
			</section>

			{/* Projects Grid */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 gap-8">
						{filteredProjects.map((project) => (
							<div
								key={project.id}
								className="bg-card rounded-lg overflow-hidden shadow-lg"
							>
								<div className="grid md:grid-cols-2 gap-6">
									<div className="relative">
										<div className="aspect-video relative overflow-hidden">
											{project.images && project.images[0] && (
												<img
													src={project.images[0]}
													alt={project.title}
													className="absolute inset-0 w-full h-full object-cover"
												/>
											)}
										</div>
										{project.images && project.images.length > 1 && (
											<div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto">
												{project.images.slice(1).map((image, index) => (
													<img
														key={index}
														src={image}
														alt={`${project.title} - Image ${
															index + 2
														}`}
														className="h-16 w-24 object-cover rounded-md"
													/>
												))}
											</div>
										)}
									</div>
									<div className="p-6">
										<div className="flex items-center gap-2 mb-4">
											<span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
												{project.category}
											</span>
											<span className="px-3 py-1 rounded-full text-sm font-medium bg-muted">
												{project.status}
											</span>
										</div>
										<h3 className="text-2xl font-bold mb-4">{project.title}</h3>
										<p className="text-muted-foreground mb-6">
											{project.description}
										</p>
										<div className="space-y-2">
											<div className="flex justify-between text-sm">
												<span>Progress</span>
												<span>{project.progress}%</span>
											</div>
											<div className="w-full h-2 bg-muted rounded-full overflow-hidden">
												<div
													className="h-full bg-primary"
													style={{ width: `${project.progress}%` }}
												/>
											</div>
										</div>
										<dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
											<div>
												<dt className="text-muted-foreground">Location</dt>
												<dd className="font-medium">{project.location}</dd>
											</div>
											<div>
												<dt className="text-muted-foreground">
													Start Date
												</dt>
												<dd className="font-medium">{project.startDate}</dd>
											</div>
											<div>
												<dt className="text-muted-foreground">Impact</dt>
												<dd className="font-medium">{project.impact}</dd>
											</div>
											<div>
												<dt className="text-muted-foreground">Budget</dt>
												<dd className="font-medium">{project.budget}</dd>
											</div>
										</dl>
										{project.id === 1 && (
											<Link
												to="/projects/decagon-homes"
												className="mt-6 inline-block"
											>
												<Button>View Full Project Details</Button>
											</Link>
										)}
										{project.id === 2 && (
											<Link
												to="/projects/oven-flair"
												className="mt-6 inline-block"
											>
												<Button>View Full Project Details</Button>
											</Link>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Support Section */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-6">Support Our Projects</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Your support can help us continue these impactful projects and start new
						ones. Every contribution makes a difference in our community.
					</p>
					<div className="flex justify-center gap-4">
						<Link to="/support">
							<Button size="lg" variant="secondary">
								Donate Now
							</Button>
						</Link>
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
