import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

// Sample impact stories - replace with actual data
const impactStories = [
	{
		id: 1,
		name: "Nsamba Ruth",
		age: 14,
		program: "Education Initiative",
		story: "Through KCF's scholarship program, I was able to continue my education at Mbulamuti Junior School. Today, I'm one of the top students in my class and dream of becoming a doctor to help my community.",
		year: "2024",
		quote: "Education has given me hope for a brighter future.",
	},
	{
		id: 2,
		name: "Oketch Paul",
		age: 17,
		program: "Vocational Training",
		story: "The vocational training program taught me valuable skills in agriculture. Now, I help manage the foundation's piggery project and can support my younger siblings.",
		year: "2023",
		quote: "I learned that with the right skills, I can create my own opportunities.",
	},
	{
		id: 3,
		name: "Babirye Joyce",
		age: 11,
		program: "Community Support",
		story: "After losing both parents, KCF provided me with a safe home, education, and a loving community. The foundation has become my second family.",
		year: "2023",
		quote: "KCF gave me a second chance at life and happiness.",
	},
];

const testimonials = [
	{
		id: 1,
		name: "Cheng Cindy",
		role: "International Volunteer",
		country: "Taiwan",
		testimonial:
			"Volunteering with KCF was a life-changing experience. The dedication of the team and the resilience of the children are truly inspiring.",
		image: "/images/testimonials/cheng.jpg",
	},
	{
		id: 2,
		name: "Mr. Anthony",
		role: "Donor Partner",
		country: "Malta",
		testimonial:
			"Seeing the direct impact of our support on these children's lives has been incredibly rewarding. KCF's transparency and commitment to their mission is commendable.",
		image: "/images/testimonials/anthony.jpg",
	},
];

export default function ImpactStories() {
	return (
		<div>
			{/* Hero Section */}
			<section className="bg-muted py-20">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-center mb-6">Impact Stories</h1>
					<p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
						Discover how your support is transforming lives and creating lasting
						positive change in our community through these inspiring stories.
					</p>
				</div>
			</section>

			{/* Featured Story */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div></div>
						<div>
							<h2 className="text-3xl font-bold mb-6">Featured Story</h2>
							<div className="space-y-6">
								<div>
									<h3 className="text-2xl font-semibold mb-2">
										{impactStories[0].name}
									</h3>
									<p className="text-muted-foreground">
										Age: {impactStories[0].age} • Program:{" "}
										{impactStories[0].program}
									</p>
								</div>
								<blockquote className="text-xl italic border-l-4 border-primary pl-4">
									"{impactStories[0].quote}"
								</blockquote>
								<p className="text-muted-foreground">{impactStories[0].story}</p>
								<Button>Read Full Story</Button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* More Success Stories */}
			<section className="py-20 bg-muted">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">More Success Stories</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{impactStories.slice(1).map((story) => (
							<Card key={story.id}>
								<CardHeader>
									<CardTitle>{story.name}</CardTitle>
									<p className="text-muted-foreground">
										Age: {story.age} • Program: {story.program}
									</p>
								</CardHeader>
								<CardContent>
									<blockquote className="text-lg italic mb-4">
										"{story.quote}"
									</blockquote>
									<p className="text-muted-foreground mb-6">{story.story}</p>
									<Button variant="outline" className="w-full">
										Read Full Story
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{testimonials.map((testimonial) => (
							<Card key={testimonial.id}>
								<CardContent className="p-6">
									<div className="flex items-center gap-4 mb-4">
										<div className="w-16 h-16 rounded-full bg-muted overflow-hidden">
											{/* Replace with actual image component */}
											<div
												className="w-full h-full bg-cover bg-center"
												style={{
													backgroundImage: `url(${testimonial.image})`,
												}}
											/>
										</div>
										<div>
											<h3 className="font-semibold">{testimonial.name}</h3>
											<p className="text-sm text-muted-foreground">
												{testimonial.role} • {testimonial.country}
											</p>
										</div>
									</div>
									<blockquote className="text-muted-foreground">
										"{testimonial.testimonial}"
									</blockquote>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-6">Help Us Create More Success Stories</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Your support can help us continue transforming lives and creating positive
						change in our community.
					</p>
					<div className="flex justify-center gap-4">
						<Link to="/support">
							<Button size="lg" variant="secondary">
								Support Our Cause
							</Button>
						</Link>
						<Link to="/volunteer">
							<Button
								size="lg"
								variant="outline"
								className="bg-white/10 hover:bg-white/20"
							>
								Volunteer With Us
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
