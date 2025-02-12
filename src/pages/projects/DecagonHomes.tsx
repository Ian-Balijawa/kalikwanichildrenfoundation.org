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
						<p className="text-xl font-semibold mb-2">
							Empowering Children, Transforming Lives
						</p>
						<p className="text-lg text-muted-foreground">
							A revolutionary approach to orphan care in Kamuli District, Uganda -
							2025 The Year of HOPE
						</p>
					</div>
				</div>
			</section>

			{/* Project Overview */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<div className="prose prose-lg max-w-none">
							<h2>Our Story</h2>
							<p>
								At the heart of our foundation lies a personal story of resilience
								and determination. The founders lost their beloved mother at a
								tender age. Left with a void that could not be easily filled, they
								faced numerous challenges and uncertainties. Their dreams seemed
								unreachable as their father, retired from his electrician job,
								struggled to make ends meet. Unfortunately, he also passed away a
								few years after his retirement.
							</p>
							<p>
								In the face of adversity, the brothers found support and solace in
								their older brother, who selflessly sacrificed his own education to
								ensure that they had the chance of a brighter future. This act of
								love and sacrifice became the foundation of our resolution to make a
								difference in the lives of other children facing horrendous
								obstacles.
							</p>

							<h2>Current Status</h2>
							<p>
								Over a year ago, we asked our brother Samuel to assist and run the
								Orphanage full time. Since then, apart from assisting many children
								living in various houses, we are now blessed with around 45 children
								from the age of 2 to 17. Currently, we only use our parents' home,
								and we drastically need to build a proper and dignified home.
							</p>

							{/* Image Gallery */}
							<h2>Project Gallery</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8 not-prose">
								<div className="col-span-full">
									<div className="aspect-[21/9] rounded-lg overflow-hidden">
										<img
											src="/image1.png"
											alt="Project Overview"
											className="w-full h-full object-cover"
										/>
									</div>
								</div>
								<div className="aspect-square rounded-lg overflow-hidden">
									<img
										src="/image2.png"
										alt="Project Location"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="aspect-square rounded-lg overflow-hidden">
									<img
										src="/image3.png"
										alt="Current Facilities"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="aspect-square rounded-lg overflow-hidden">
									<img
										src="/image4.png"
										alt="Building Plans"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="aspect-square rounded-lg overflow-hidden">
									<img
										src="/image5.png"
										alt="Community Activities"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="aspect-square rounded-lg overflow-hidden">
									<img
										src="/image7.png"
										alt="Future Vision"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="aspect-square rounded-lg overflow-hidden">
									<img
										src="/image8.png"
										alt="Future Vision"
										className="w-full h-full object-cover"
									/>
								</div>
							</div>

							<h2>The Village Hub Project</h2>
							<div className="bg-muted p-6 rounded-lg my-8">
								<p>
									KCF is working to build a public social protection system in
									Uganda, run by local communities, to dismantle the structural
									root causes of poverty through the Village Hub Project. Based in
									Kamuli District, this initiative aims to:
								</p>
								<ul>
									<li>Eliminate dependence on charity</li>
									<li>Restore local sovereignty</li>
									<li>Strengthen universal public services</li>
									<li>Establish early intervention public programs</li>
									<li>
										Transform traditional orphanage care into a family-based
										model
									</li>
								</ul>
							</div>

							<h2>Location and Land</h2>
							<p>
								The project is located at 0°51'38.67" N 33°03'26.63" E in Kamuli
								District. We have acquired 4.5 acres (approximately 18,211 square
								meters) of land close to our pig farm to accommodate both the family
								homes and the Village Hub facilities.
							</p>

							<h2>Innovative Design Concept</h2>
							<p>
								Moving away from traditional orphanage designs, our approach focuses
								on creating genuine family environments. We don't want just to give
								a roof over these angels' heads - we aim to transform each child's
								life through a real family experience.
							</p>

							<h3>Building Structure</h3>
							<div className="grid md:grid-cols-2 gap-8 my-8">
								<div>
									<h4 className="font-semibold">Ground Floor</h4>
									<ul>
										<li>Individual family entrances</li>
										<li>Private kitchen and living spaces</li>
										<li>Family dining areas</li>
										<li>Shared courtyard access</li>
									</ul>
								</div>
								<div>
									<h4 className="font-semibold">First Floor</h4>
									<ul>
										<li>Family bedrooms</li>
										<li>Private bathrooms</li>
										<li>Study areas</li>
										<li>Storage spaces</li>
									</ul>
								</div>
								<div>
									<h4 className="font-semibold">Second Floor</h4>
									<ul>
										<li>Indoor gym and recreation spaces</li>
										<li>Craft workshops</li>
										<li>Study room with computers</li>
										<li>Seminary-style hall</li>
										<li>Director's living quarters</li>
									</ul>
								</div>
								<div>
									<h4 className="font-semibold">Semi-Basement</h4>
									<ul>
										<li>Water purification systems</li>
										<li>Storage facilities</li>
										<li>Workshop spaces</li>
										<li>Utility rooms</li>
									</ul>
								</div>
							</div>

							<h2>Family Structure</h2>
							<div className="bg-muted p-6 rounded-lg my-8">
								<ul>
									<li>10 house mothers, each caring for 5 children</li>
									<li>
										Mixed-age groups with approximately 18 months between ages
									</li>
									<li>Weekly visits from assigned father figures</li>
									<li>Individual family celebrations and activities</li>
									<li>Integration with local community</li>
								</ul>
							</div>

							<h2>Infrastructure and Facilities</h2>
							<ul>
								<li>Water borehole with Reverse Osmosis filtration system</li>
								<li>Solar panel water heaters</li>
								<li>Gas-operated kitchens with central 80kg gas tanks</li>
								<li>Separate laundry facility</li>
								<li>Secure courtyard for community activities</li>
								<li>Emergency exits and safety features</li>
							</ul>

							<h2>Project Costs</h2>
							<div className="bg-muted p-6 rounded-lg my-8">
								<h3 className="text-xl font-semibold mb-4">Budget Breakdown</h3>
								<div className="space-y-2">
									<div className="flex justify-between">
										<span>Construction Cost</span>
										<span className="font-medium">
											$1,658,101.00 (6,110,102,185 UGX)
										</span>
									</div>
									<div className="flex justify-between">
										<span>Land Acquisition</span>
										<span className="font-medium">
											$13,554.00 (50,000,000 UGX)
										</span>
									</div>
									<div className="flex justify-between">
										<span>Furniture and Equipment</span>
										<span className="font-medium">
											$30,000.00 (110,400,000 UGX)
										</span>
									</div>
									<div className="flex justify-between border-t pt-2 mt-2">
										<span className="font-bold">Total Project Cost</span>
										<span className="font-bold">$1,700,655.00</span>
									</div>
								</div>
							</div>

							<h2>Project Partners</h2>
							<p>
								We are working with{" "}
								<a
									href="http://www.kasthew-construction.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary hover:underline"
								>
									Kasthew Construction UG Ltd.
								</a>
								, who have provided the cost estimates and will carry out the
								construction.
							</p>

							<div className="mt-12 flex justify-center gap-4">
								<Link to="/support">
									<Button size="lg">Support This Project</Button>
								</Link>
								<a
									href="https://kalikwanichildrenfoundation.org/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Button size="lg" variant="outline">
										Visit Our Website
									</Button>
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
