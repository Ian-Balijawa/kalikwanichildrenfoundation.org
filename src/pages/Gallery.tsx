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

const galleryItems = [
	{
		id: 1,
		title: "Education Program Activities",
		category: "education",
		date: "2024",
		description: "Students engaged in various educational activities",
		image: "/images/IMG-20250123-WA0146.jpg",
	},
	{
		id: 2,
		title: "Community Outreach",
		category: "events",
		date: "2024",
		description: "Community engagement and support activities",
		image: "/images/IMG-20250123-WA0145.jpg",
	},
	{
		id: 3,
		title: "Student Support Programs",
		category: "education",
		date: "2024",
		description: "Supporting students in their educational journey",
		image: "/images/IMG-20250123-WA0144.jpg",
	},
	{
		id: 4,
		title: "Agricultural Projects",
		category: "farming",
		date: "2024",
		description: "Sustainable farming initiatives",
		image: "/images/IMG-20250123-WA0143.jpg",
	},
	{
		id: 5,
		title: "Volunteer Activities",
		category: "volunteers",
		date: "2024",
		description: "International volunteers making a difference",
		image: "/images/IMG-20250123-WA0142.jpg",
	},
	{
		id: 6,
		title: "Community Events",
		category: "events",
		date: "2024",
		description: "Bringing the community together",
		image: "/images/IMG-20250123-WA0141.jpg",
	},
	{
		id: 7,
		title: "School Programs",
		category: "education",
		date: "2024",
		description: "Educational programs in action",
		image: "/images/IMG-20250123-WA0140.jpg",
	},
	{
		id: 8,
		title: "Development Projects",
		category: "projects",
		date: "2024",
		description: "Infrastructure and development initiatives",
		image: "/images/IMG-20250123-WA0139.jpg",
	},
	{
		id: 9,
		title: "Student Activities",
		category: "education",
		date: "2024",
		description: "Students participating in various activities",
		image: "/images/IMG-20250123-WA0138.jpg",
	},
	{
		id: 10,
		title: "Community Support",
		category: "events",
		date: "2024",
		description: "Supporting our local community",
		image: "/images/IMG-20250123-WA0137.jpg",
	},
	{
		id: 11,
		title: "Farming Initiatives",
		category: "farming",
		date: "2024",
		description: "Sustainable agriculture projects",
		image: "/images/IMG-20250123-WA0136.jpg",
	},
	{
		id: 12,
		title: "Volunteer Programs",
		category: "volunteers",
		date: "2024",
		description: "International volunteers in action",
		image: "/images/IMG-20250123-WA0135.jpg",
	},
	{
		id: 13,
		title: "Community Moments",
		category: "others",
		date: "2024",
		description: "A moment from our community.",
		image: "/images/IMG-20250624-WA0017.jpg",
	},
	{
		id: 14,
		title: "Community Moments",
		category: "others",
		date: "2024",
		description: "A moment from our community.",
		image: "/images/IMG-20250624-WA0018.jpg",
	},
	{
		id: 16,
		title: "Community Moments",
		category: "others",
		date: "2024",
		description: "A moment from our community.",
		image: "/images/IMG-20250624-WA0020.jpg",
	},
	{
		id: 17,
		title: "Community Moments",
		category: "others",
		date: "2024",
		description: "A moment from our community.",
		image: "/images/IMG-20250624-WA0021.jpg",
	},
	{
		id: 18,
		title: "Community Moments",
		category: "others",
		date: "2024",
		description: "A moment from our community.",
		image: "/images/IMG-20250624-WA0022.jpg",
	},
	{
		id: 19,
		title: "Community Moments",
		category: "others",
		date: "2024",
		description: "A moment from our community.",
		image: "/images/IMG-20250624-WA0023.jpg",
	},
	{
		id: 20,
		title: "Community Moments",
		category: "others",
		date: "2024",
		description: "A moment from our community.",
		image: "/images/IMG-20250624-WA0024.jpg",
	},
	{
		id: 22,
		title: "Community Moments",
		category: "others",
		date: "2024",
		description: "A moment from our community.",
		image: "/images/IMG-20250624-WA0026.jpg",
	},
	{
		id: 23,
		title: "Community Moments",
		category: "others",
		date: "2024",
		description: "A moment from our community.",
		image: "/images/IMG-20250624-WA0027.jpg",
	},
	{
		id: 24,
		title: "Community Moments",
		category: "others",
		date: "2024",
		description: "A moment from our community.",
		image: "/images/IMG-20250625-WA0001.jpg",
	},
	{
		id: 25,
		title: "Community Moments",
		category: "others",
		date: "2024",
		description: "A moment from our community.",
		image: "/images/IMG-20250625-WA0002.jpg",
	},
];

// Function to extract YouTube video ID from URL
function getYouTubeVideoId(url: string) {
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
	const match = url.match(regExp);
	return match && match[2].length === 11 ? match[2] : null;
}

// Function to get YouTube thumbnail URL
function getYouTubeThumbnail(url: string) {
	const videoId = getYouTubeVideoId(url);
	return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
}

// Sample videos data - replace with actual video links
const videoItems = [
	{
		id: 1,
		title: "School Opening Ceremony",
		description: "Highlights from our new school opening ceremony",
		url: "https://www.youtube.com/watch?v=69M8vCpnoCQ",
	},
	{
		id: 2,
		title: "Student Success Stories",
		description: "Inspiring stories from our scholarship recipients",
		url: "https://www.youtube.com/watch?v=mqOyO-UCO0k",
	},
];

const categories = [
	{ value: "all", label: "All Categories" },
	{ value: "education", label: "Education" },
	{ value: "farming", label: "Farming Projects" },
	{ value: "volunteers", label: "Volunteers" },
	{ value: "events", label: "Events" },
	{ value: "projects", label: "Projects" },
	{ value: "others", label: "Others" },
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
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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
											className="w-full h-full bg-cover bg-center cursor-pointer relative"
											style={{
												backgroundImage: `url('${getYouTubeThumbnail(
													video.url
												)}')`,
											}}
											onClick={() => setSelectedVideo(video.id)}
										>
											<div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
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
