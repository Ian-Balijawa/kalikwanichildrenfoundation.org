import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Sample news data - replace with actual data
const newsItems = [
	{
		id: 1,
		title: "New School Construction Project Begins",
		date: "January 15, 2024",
		category: "Projects",
		summary:
			"Construction of our new primary and nursery school in Kaliro district has commenced, marking a significant milestone in our mission to provide quality education.",
		image: "/images/news/school-construction.jpg",
		author: "KCF Team",
	},
	{
		id: 2,
		title: "International Volunteer Program Success",
		date: "December 20, 2023",
		category: "Volunteers",
		summary:
			"Our international volunteer program continues to grow with successful partnerships and impactful contributions from volunteers worldwide.",
		image: "/images/news/volunteers.jpg",
		author: "Volunteer Coordinator",
	},
	{
		id: 3,
		title: "Sustainable Farming Initiative Expands",
		date: "December 5, 2023",
		category: "Programs",
		summary:
			"Our piggery farming project has shown remarkable success, leading to plans for expansion into poultry and goat rearing initiatives.",
		image: "/images/news/farming.jpg",
		author: "Agricultural Team",
	},
	{
		id: 4,
		title: "Educational Support Reaches New Milestone",
		date: "November 28, 2023",
		category: "Education",
		summary:
			"We've reached a significant milestone of supporting over 45 students across various schools, providing comprehensive educational assistance.",
		image: "/images/news/education.jpg",
		author: "Education Coordinator",
	},
	{
		id: 5,
		title: "Partnership with IUIU Strengthens Community Ties",
		date: "November 15, 2023",
		category: "Partnerships",
		summary:
			"Students from Islamic University In Uganda have joined forces with KCF to support our mission through various community initiatives.",
		image: "/images/news/partnership.jpg",
		author: "Partnership Team",
	},
];

export default function News() {
	return (
		<div>
			{/* Hero Section */}
			<section className="bg-muted py-20">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-center mb-6">Latest News</h1>
					<p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
						Stay updated with the latest news, developments, and stories from Kalikwani
						Children's Foundation.
					</p>
				</div>
			</section>

			{/* News Grid */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{newsItems.map((item) => (
							<Card key={item.id} className="flex flex-col">
								<div className="aspect-video bg-muted relative overflow-hidden">
									{/* Replace with actual image component */}
									<div
										className="w-full h-full bg-cover bg-center"
										style={{ backgroundImage: `url(${item.image})` }}
									/>
									<div className="absolute top-4 right-4">
										<span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm">
											{item.category}
										</span>
									</div>
								</div>
								<CardHeader>
									<div className="text-sm text-muted-foreground mb-2">
										{item.date} • {item.author}
									</div>
									<CardTitle className="text-xl">{item.title}</CardTitle>
								</CardHeader>
								<CardContent className="flex-grow">
									<p className="text-muted-foreground mb-6">{item.summary}</p>
									<Button variant="outline" className="w-full">
										Read More
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Newsletter Signup */}
			<section className="py-20 bg-muted">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
					<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
						Subscribe to our newsletter to receive regular updates about our programs,
						impact stories, and ways to get involved.
					</p>
					<div className="flex justify-center">
						<Link to="/contact">
							<Button size="lg">Subscribe to Newsletter</Button>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
