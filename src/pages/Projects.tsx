import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
		title: "Busota Primary School Construction",
		category: "Education",
		status: "Ongoing",
		startDate: "January 2024",
		endDate: "December 2024",
		location: "Busota Village",
		description:
			"Construction of a new primary school building with 8 classrooms, a library, and administrative offices.",
		impact: "Will provide quality education facilities for 400 students",
		budget: "$150,000",
		progress: 35,
		images: ["/images/projects/school-1.jpg", "/images/projects/school-2.jpg"],
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
		id: 2,
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
		images: ["/images/projects/farm-1.jpg", "/images/projects/farm-2.jpg"],
		updates: [
			{
				date: "February 2024",
				title: "First Harvest Complete",
				description: "Successfully completed first harvest of maize and vegetables.",
			},
		],
	},
	{
		id: 3,
		title: "Healthcare Outreach Program",
		category: "Healthcare",
		status: "Completed",
		startDate: "June 2023",
		endDate: "December 2023",
		location: "Multiple Villages",
		description:
			"Mobile health clinics providing basic healthcare services and health education.",
		impact: "Served over 2,000 community members",
		budget: "$45,000",
		progress: 100,
		images: ["/images/projects/health-1.jpg", "/images/projects/health-2.jpg"],
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

const categories = ["All", "Education", "Agriculture", "Healthcare", "Infrastructure"];
const statuses = ["All", "Ongoing", "Completed"];

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
						Explore our ongoing and completed projects that are making a lasting impact
						in the Busota community and beyond.
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
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{filteredProjects.map((project) => (
							<Card key={project.id} className="overflow-hidden">
								<div className="aspect-video relative">
									{/* Replace with actual image component */}
									<div
										className="w-full h-full bg-cover bg-center"
										style={{ backgroundImage: `url(${project.images[0]})` }}
									/>
									<div className="absolute top-4 right-4">
										<span
											className={`px-3 py-1 rounded-full text-sm font-medium ${
												project.status === "Ongoing"
													? "bg-primary text-primary-foreground"
													: "bg-green-500 text-white"
											}`}
										>
											{project.status}
										</span>
									</div>
								</div>
								<CardHeader>
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium text-primary">
											{project.category}
										</span>
										<span className="text-sm text-muted-foreground">
											{project.startDate} - {project.endDate}
										</span>
									</div>
									<CardTitle>{project.title}</CardTitle>
									<p className="text-sm text-muted-foreground">
										📍 {project.location}
									</p>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-6">
										{project.description}
									</p>
									<div className="space-y-4">
										<div>
											<div className="flex justify-between mb-1">
												<span className="text-sm font-medium">
													Progress
												</span>
												<span className="text-sm text-muted-foreground">
													{project.progress}%
												</span>
											</div>
											<div className="w-full bg-muted rounded-full h-2.5">
												<div
													className="bg-primary h-2.5 rounded-full"
													style={{ width: `${project.progress}%` }}
												/>
											</div>
										</div>
										<div className="grid grid-cols-2 gap-4">
											<div>
												<p className="text-sm font-medium mb-1">Impact</p>
												<p className="text-sm text-muted-foreground">
													{project.impact}
												</p>
											</div>
											<div>
												<p className="text-sm font-medium mb-1">Budget</p>
												<p className="text-sm text-muted-foreground">
													{project.budget}
												</p>
											</div>
										</div>
										{project.updates.length > 0 && (
											<div>
												<p className="text-sm font-medium mb-2">
													Latest Update
												</p>
												<div className="bg-muted p-3 rounded-lg">
													<p className="text-sm font-medium">
														{project.updates[0].title}
													</p>
													<p className="text-sm text-muted-foreground">
														{project.updates[0].date}
													</p>
													<p className="text-sm mt-1">
														{project.updates[0].description}
													</p>
												</div>
											</div>
										)}
									</div>
								</CardContent>
							</Card>
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
