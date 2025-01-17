import { useState } from "react";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// Sample gallery data - replace with actual images and data
const galleryItems = [
	{
		id: 1,
		title: "Education Program at Mbulamuti Junior School",
		category: "education",
		date: "2024",
		description: "Students and staff members at Mbulamuti Junior School",
		image: "/images/gallery/education-1.jpg",
	},
	{
		id: 2,
		title: "Nyanza High School Visit",
		category: "education",
		date: "2024",
		description: "Staff and beneficiaries at Nyanza High School",
		image: "/images/gallery/education-2.jpg",
	},
	{
		id: 3,
		title: "Green Hill Junior School",
		category: "education",
		date: "2024",
		description: "Activities at Green Hill Junior School",
		image: "/images/gallery/education-3.jpg",
	},
	{
		id: 4,
		title: "Piggery Farm Project",
		category: "farming",
		date: "2024",
		description: "Our sustainable piggery farming initiative",
		image: "/images/gallery/farming-1.jpg",
	},
	{
		id: 5,
		title: "International Volunteer - Cheng Cindy",
		category: "volunteers",
		date: "2024",
		description: "Volunteer from Taiwan contributing to our mission",
		image: "/images/gallery/volunteer-1.jpg",
	},
	{
		id: 6,
		title: "IUIU Students Visit",
		category: "events",
		date: "2024",
		description: "Students from Islamic University In Uganda visiting our foundation",
		image: "/images/gallery/events-1.jpg",
	},
	{
		id: 7,
		title: "Maltese Donors Visit",
		category: "events",
		date: "2024",
		description: "Mr. Anthony and donors from Malta supporting our cause",
		image: "/images/gallery/events-2.jpg",
	},
	{
		id: 8,
		title: "School Construction Project",
		category: "projects",
		date: "2024",
		description: "Progress on our primary and nursery school construction",
		image: "/images/gallery/projects-1.jpg",
	},
];

// Sample videos data - replace with actual video links
const videoItems = [
	{
		id: 1,
		title: "School Opening Ceremony",
		description: "Highlights from our new school opening ceremony",
		url: "https://www.youtube.com/watch?v=example1",
		thumbnail: "/images/gallery/video-thumb-1.jpg",
	},
	{
		id: 2,
		title: "Student Success Stories",
		description: "Inspiring stories from our scholarship recipients",
		url: "https://www.youtube.com/watch?v=example2",
		thumbnail: "/images/gallery/video-thumb-2.jpg",
	},
	{
		id: 3,
		title: "Farming Project Launch",
		description: "Launch of our sustainable farming initiative",
		url: "https://www.youtube.com/watch?v=example3",
		thumbnail: "/images/gallery/video-thumb-3.jpg",
	},
];

const categories = [
	{ value: "all", label: "All Categories" },
	{ value: "education", label: "Education" },
	{ value: "farming", label: "Farming Projects" },
	{ value: "volunteers", label: "Volunteers" },
	{ value: "events", label: "Events" },
	{ value: "projects", label: "Projects" },
];

export default function Gallery() {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedYear, setSelectedYear] = useState("all");
	const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

	const filteredGallery = galleryItems.filter((item) => {
		if (selectedCategory !== "all" && item.category !== selectedCategory) {
			return false;
		}
		if (selectedYear !== "all" && item.date !== selectedYear) {
			return false;
		}
		return true;
	});

	return (
		<div>
			{/* Hero Section */}
			<section className="bg-muted py-20 w-full">
				<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h1 className="text-4xl font-bold text-center mb-6">Gallery</h1>
					<p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
						Explore our journey through images, showcasing the impact of our programs
						and the stories of the children we support.
					</p>
				</div>
			</section>

			{/* Filters */}
			<section className="py-8 border-b w-full">
				<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-wrap gap-4 items-center justify-center">
						<Select value={selectedCategory} onValueChange={setSelectedCategory}>
							<SelectTrigger className="w-[200px]">
								<SelectValue placeholder="Select Category" />
							</SelectTrigger>
							<SelectContent>
								{categories.map((category) => (
									<SelectItem key={category.value} value={category.value}>
										{category.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Select value={selectedYear} onValueChange={setSelectedYear}>
							<SelectTrigger className="w-[200px]">
								<SelectValue placeholder="Select Year" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Years</SelectItem>
								<SelectItem value="2024">2024</SelectItem>
								<SelectItem value="2023">2023</SelectItem>
							</SelectContent>
						</Select>

						<Button
							variant="outline"
							onClick={() => {
								setSelectedCategory("all");
								setSelectedYear("all");
							}}
						>
							Reset Filters
						</Button>
					</div>
				</div>
			</section>

			{/* Gallery Grid */}
			<section className="py-12 w-full">
				<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredGallery.map((item) => (
							<div key={item.id} className="group relative">
								<div className="aspect-square bg-muted rounded-lg overflow-hidden">
									{/* Replace with actual image component */}
									<div
										className="w-full h-full bg-cover bg-center"
										style={{ backgroundImage: `url(${item.image})` }}
									>
										<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											<div className="absolute inset-0 p-6 text-white flex flex-col justify-end">
												<h3 className="text-lg font-semibold mb-2">
													{item.title}
												</h3>
												<p className="text-sm opacity-80">
													{item.description}
												</p>
												<div className="flex items-center gap-2 mt-4">
													<span className="text-xs px-2 py-1 bg-white/20 rounded">
														{
															categories.find(
																(c) => c.value === item.category
															)?.label
														}
													</span>
													<span className="text-xs px-2 py-1 bg-white/20 rounded">
														{item.date}
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Videos Section */}
			<section className="py-12 bg-muted w-full">
				<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold text-center mb-8">Featured Videos</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{videoItems.map((video) => (
							<div key={video.id} className="group relative">
								<div className="aspect-video bg-black rounded-lg overflow-hidden">
									{selectedVideo === video.id ? (
										<ReactPlayer
											url={video.url}
											width="100%"
											height="100%"
											controls
											playing={selectedVideo === video.id}
										/>
									) : (
										<div
											className="w-full h-full bg-cover bg-center cursor-pointer"
											style={{ backgroundImage: `url(${video.thumbnail})` }}
											onClick={() => setSelectedVideo(video.id)}
										>
											<div className="absolute inset-0 bg-black/40 flex items-center justify-center">
												<div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
													<svg
														className="w-8 h-8 text-primary translate-x-0.5"
														fill="currentColor"
														viewBox="0 0 24 24"
													>
														<path d="M8 5v14l11-7z" />
													</svg>
												</div>
											</div>
											<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
												<h3 className="text-white font-semibold mb-1">
													{video.title}
												</h3>
												<p className="text-white/80 text-sm">
													{video.description}
												</p>
											</div>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Empty State */}
			{filteredGallery.length === 0 && (
				<div className="py-20 text-center w-full">
					<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<p className="text-lg text-muted-foreground">
							No images found for the selected filters.
						</p>
						<Button
							variant="outline"
							className="mt-4"
							onClick={() => {
								setSelectedCategory("all");
								setSelectedYear("all");
							}}
						>
							Reset Filters
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
