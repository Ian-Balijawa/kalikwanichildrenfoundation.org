import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Partnerships() {
	return (
		<div>
			{/* Hero Section */}
			<section className="bg-muted py-20">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-center mb-6">Partnership</h1>
					<p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
						You can find us in a world community of volunteers. We are honored to be
						part of a community that allows us to connect with people globally.
					</p>
				</div>
			</section>

			{/* Main Content */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						{/* Image */}
						<div className="w-full">
							<img
								src="/partnership.jpg"
								alt="Partnership"
								className="rounded-lg shadow-lg w-full h-auto object-cover"
							/>
						</div>

						{/* Content */}
						<div className="space-y-8">
							<Card>
								<CardHeader>
									<CardTitle>Home Stay & Volunteering</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Through Home Stay, people from around the world can learn
										about us and share their wish to volunteer. It's a platform
										that connects us with a global community of helpers.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Find Us Online</CardTitle>
								</CardHeader>
								<CardContent>
									<ul className="space-y-2 text-muted-foreground">
										<li>
											<a
												href="https://www.kalikwanichildrenfoundation.org"
												target="_blank"
												rel="noopener noreferrer"
												className="text-primary underline"
											>
												www.kalikwanichildrenfoundation.org
											</a>
										</li>
										<li>
											<a
												href="https://www.kalikwanichildrensfoundationkcf.com"
												target="_blank"
												rel="noopener noreferrer"
												className="text-primary underline"
											>
												www.kalikwanichildrensfoundationkcf.com
											</a>
										</li>
										<li>
											<a
												href="https://www.helpstay.com"
												target="_blank"
												rel="noopener noreferrer"
												className="text-primary underline"
											>
												HelpStay
											</a>
										</li>
										<li>
											<a
												href="https://www.worldpackers.com"
												target="_blank"
												rel="noopener noreferrer"
												className="text-primary underline"
											>
												Worldpackers
											</a>
										</li>
									</ul>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* Key Statistics or Partner Schools Section (add or update as appropriate) */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Our Partner Schools</h2>
					<ul className="max-w-xl mx-auto text-lg text-muted-foreground list-disc pl-6 space-y-2">
						<li>Royal College Kamuli</li>
						<li>Mbulamuti Junior School</li>
						<li>Green Hill Nursery and Primary School</li>
						<li>White Angels Junior School</li>
						<li>Nyanza High School</li>
					</ul>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Thank you for your interest in partnering with us. Please feel free to reach
						out with any questions or ideas.
					</p>
					<div className="flex justify-center">
						<Link to="/contact">
							<Button
								size="lg"
								variant="secondary"
								className="bg-white/90 hover:bg-white"
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
