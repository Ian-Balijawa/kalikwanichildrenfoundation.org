import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function DecagonHomes() {
	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="bg-muted py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto text-center">
						<h1 className="text-4xl font-bold mb-6">Decagon Family Homes Project</h1>
						<p className="text-lg text-muted-foreground">
							A revolutionary approach to orphan care in Kamuli District, Uganda
						</p>
					</div>
				</div>
			</section>

			{/* Project Overview */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<div className="prose prose-lg max-w-none">
							<h2>Project Background</h2>
							<p>
								At the heart of our foundation lies a personal story of resilience
								and determination. This act of love and sacrifice became the
								foundation of our resolution to make a difference in the lives of
								other children facing horrendous obstacles. Currently supporting 45
								children aged 2-17, we're building a unique decagon-shaped complex
								of 10 family homes that will provide genuine family structures
								rather than institutional care.
							</p>

							{/* Image Gallery */}
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
								<img
									src="/image1.png"
									alt="Current facilities"
									className="rounded-lg col-span-2 md:col-span-3"
								/>
								<img
									src="/image2.png"
									alt="Location map overview"
									className="rounded-lg"
								/>
								<img
									src="/image3.png"
									alt="Detailed location"
									className="rounded-lg"
								/>
								<img src="/image4.png" alt="Project site" className="rounded-lg" />
							</div>

							<h2>Location</h2>
							<p>
								The project is located at 0°52'21.22" N 33°04'10.17" E, on a 4-acre
								land (approximately 16,187 square meters) close to our pig farm.
								This strategic location was carefully chosen to provide the perfect
								environment for our family-centered approach.
							</p>

							<h2>Innovative Design Concept</h2>
							<p>
								Moving away from traditional orphanage designs, our approach focuses
								on creating genuine family environments. Each unit is designed to
								house one house mother with 5 children, arranged in a decagon shape
								that creates a communal courtyard while maintaining individual
								family privacy.
							</p>

							<h3>Building Structure</h3>
							<ul>
								<li>
									<strong>Ground Floor:</strong> Family living space with private
									entrance, kitchen, bathroom, and living room
								</li>
								<li>
									<strong>First Floor:</strong> Bedrooms with shower, toilet, and
									study areas
								</li>
								<li>
									<strong>Second Floor:</strong> Recreation and activity spaces,
									including:
									<ul>
										<li>Indoor gyms and craft workshops</li>
										<li>Study room with computers and Wi-Fi</li>
										<li>Game areas and recreational spaces</li>
									</ul>
								</li>
								<li>
									<strong>Semi-basement:</strong> Workshops, water filtration
									systems, and storage
								</li>
							</ul>

							<h2>Family Structure</h2>
							<ul>
								<li>10 house mothers, each caring for 5 children</li>
								<li>Children arranged in age gaps of approximately 18 months</li>
								<li>Weekly visits from assigned father figures</li>
								<li>Private family dining and living spaces</li>
								<li>Regular community activities and celebrations</li>
							</ul>

							<h2>Facilities and Infrastructure</h2>
							<ul>
								<li>Water borehole with Reverse Osmosis filtration system</li>
								<li>Septic tank for proper waste management</li>
								<li>Gas-operated kitchens with central gas tank system</li>
								<li>Boiler room for hot water supply</li>
								<li>Laundry facilities</li>
								<li>Shared courtyard for community activities</li>
							</ul>

							<h2>Project Costs</h2>
							<div className="bg-muted p-6 rounded-lg my-8">
								<h3 className="text-xl font-semibold mb-4">Budget Breakdown</h3>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<p className="font-medium">Total Budget</p>
										<p className="text-2xl font-bold">€11,750.00</p>
										<p className="text-sm text-muted-foreground">
											(45 million Ugandan shillings)
										</p>
									</div>
									<div className="space-y-2">
										<div className="flex justify-between">
											<span>Architect fees and planning</span>
											<span className="font-medium">$1,000</span>
										</div>
										<div className="flex justify-between">
											<span>Materials</span>
											<span className="font-medium">$6,000</span>
										</div>
										<div className="flex justify-between">
											<span>Workers</span>
											<span className="font-medium">$2,000</span>
										</div>
										<div className="flex justify-between">
											<span>Furniture and appliances</span>
											<span className="font-medium">$1,500</span>
										</div>
										<div className="flex justify-between">
											<span>Electricity and plumbing</span>
											<span className="font-medium">$800</span>
										</div>
										<div className="flex justify-between">
											<span>Borehole & Water pump</span>
											<span className="font-medium">$700</span>
										</div>
										<div className="flex justify-between">
											<span>Septic tank</span>
											<span className="font-medium">$500</span>
										</div>
										<div className="flex justify-between">
											<span>Paint</span>
											<span className="font-medium">$300</span>
										</div>
									</div>
								</div>
							</div>

							<h2>Project Partners</h2>
							<p>
								We are working with{" "}
								<a
									href="https://sarjanconstruction.co.ug/about-us/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary hover:underline"
								>
									Sarjan Construction
								</a>
								, a reliable and experienced construction company, to bring this
								vision to life.
							</p>

							<div className="mt-12 flex justify-center">
								<Link to="/support">
									<Button size="lg">Support This Project</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
