import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function OvenFlair() {
	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="bg-muted py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto text-center">
						<h1 className="text-4xl font-bold mb-6">Oven Flair Project</h1>
						<p className="text-lg text-muted-foreground">
							Transforming lives through sustainable cooking solutions in Kamuli,
							Uganda
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
								In Africa alone, more than 600,000 people die prematurely from
								diseases caused by smoke from burning biomass, with approximately
								30,000 deaths in Uganda annually. Women and children are the primary
								victims of air pollution due to their responsibilities in household
								chores, particularly cooking with firewood.
							</p>

							<div className="my-8 aspect-video">
								<iframe
									width="100%"
									height="100%"
									src="https://www.youtube.com/embed/1WAkx8F5HVs"
									title="Oven Flair Project"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
									className="rounded-lg"
								></iframe>
							</div>

							<h2>The Challenge</h2>
							<p>
								Many poor families cook with wood using three stones set on the
								ground as pot support, resulting in:
							</p>
							<ul>
								<li>60% heat loss during cooking</li>
								<li>
									Significant smoke production leading to respiratory diseases
								</li>
								<li>
									Three major lung diseases linked to solid fuel cooking:
									<ul>
										<li>
											Acute lower respiratory infections in children under
											five
										</li>
										<li>Chronic obstructive pulmonary disease</li>
										<li>Lung cancer in people over 30</li>
									</ul>
								</li>
								<li>Deforestation due to high wood consumption</li>
							</ul>

							<h2>Our Solution</h2>
							<p>
								The Oven Flair project provides energy-efficient ovens to families
								at an affordable price point, creating a sustainable cycle of
								benefits:
							</p>
							<ul>
								<li>
									<strong>Energy Efficiency:</strong> Saves 60% of wood
									consumption
								</li>
								<li>
									<strong>Health Benefits:</strong> Significantly reduces smoke
									exposure
								</li>
								<li>
									<strong>Environmental Impact:</strong> Reduces deforestation and
									supports tree planting
								</li>
								<li>
									<strong>Dignity Preservation:</strong> Affordable pricing model
									maintains family dignity
								</li>
								<li>
									<strong>Education Support:</strong> Portion of proceeds supports
									orphan education
								</li>
							</ul>

							<h2>How It Works</h2>
							<div className="bg-muted p-6 rounded-lg my-8">
								<h3 className="text-xl font-semibold mb-4">Project Flow</h3>
								<ol className="space-y-4">
									<li>
										1. We purchase oven burners in Kampala for UGX 100,000 each
									</li>
									<li>2. Donor's name is painted on the oven</li>
									<li>
										3. Selected families purchase the oven for UGX 10,000 (10%
										of cost)
									</li>
									<li>4. UGX 5,000 goes to tree planting initiatives</li>
									<li>
										5. UGX 5,000 supports education for orphaned and poor
										children
									</li>
								</ol>
							</div>

							<h2>Environmental Impact</h2>
							<p>
								Uganda is home to 1592 known species of amphibians, birds, mammals,
								and reptiles, with 1.1% being endemic and 3.1% threatened. The
								country also hosts at least 4900 species of vascular plants. By
								reducing wood consumption and supporting reforestation, we help
								protect this rich biodiversity.
							</p>

							<h2>Support the Project</h2>
							<div className="bg-muted p-6 rounded-lg my-8">
								<h3 className="text-xl font-semibold mb-4">Donation Impact</h3>
								<p>With your donation of CAD40.00 or €30.00, you can:</p>
								<ul>
									<li>Provide a smoke-free cooking solution for one family</li>
									<li>Support tree planting initiatives</li>
									<li>Contribute to children's education</li>
									<li>Help preserve Uganda's biodiversity</li>
									<li>Reduce health risks for women and children</li>
								</ul>
							</div>

							<div className="mt-12 flex justify-center gap-4">
								<Link to="/support">
									<Button size="lg">Support This Project</Button>
								</Link>
								<a
									href="https://wa.me/256764969385"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Button size="lg" variant="outline">
										Contact on WhatsApp
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
