import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Home() {
	return (
		<div>
			{/* Hero Section */}
			<section className="relative h-[600px] flex items-center justify-center text-white">
				<div className="absolute inset-0 bg-black/50 z-10" />
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
				/>
				<div className="container mx-auto px-4 relative z-20 text-center">
					<h1 className="text-5xl font-bold mb-6">
						Empowering Children, Transforming Lives
					</h1>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Join us in our mission to create a society where every child has equal
						opportunities to thrive, grow, and reach their full potential.
					</p>
					<div className="px-4 flex justify-center gap-4">
						<Link to="/support">
							<Button size="lg" className="bg-primary hover:bg-primary/90">
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

			{/* Mission Statement */}
			<section className="py-20 bg-muted">
				<div className="container mx-auto px-4">
					<div className="max-w-3xl mx-auto text-center">
						<h2 className="text-3xl font-bold mb-6">Our Mission</h2>
						<p className="text-lg text-muted-foreground">
							To create a safe nurturing environment for teenagers, vulnerable and
							homeless children, providing them with access to education, shelter,
							life skills and advocacy support, enabling them to break the cycle of
							poverty and build a better future for themselves.
						</p>
					</div>
				</div>
			</section>

			{/* Key Statistics */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-4xl font-bold text-primary text-center">
									45+
								</CardTitle>
							</CardHeader>
							<CardContent className="text-center">
								<p className="text-muted-foreground">Children Supported</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="text-4xl font-bold text-primary text-center">
									8
								</CardTitle>
							</CardHeader>
							<CardContent className="text-center">
								<p className="text-muted-foreground">Schools Partnered</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="text-4xl font-bold text-primary text-center">
									3+
								</CardTitle>
							</CardHeader>
							<CardContent className="text-center">
								<p className="text-muted-foreground">Active Projects</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle className="text-4xl font-bold text-primary text-center">
									2+
								</CardTitle>
							</CardHeader>
							<CardContent className="text-center">
								<p className="text-muted-foreground">International Partners</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Featured Programs */}
			<section className="py-20 bg-muted">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Our Programs</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<Card>
							<CardHeader>
								<CardTitle>Education Initiative</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground mb-4">
									Providing comprehensive educational support through
									scholarships, materials, and mentoring.
								</p>
								<Link to="/programs">
									<Button variant="outline" className="w-full">
										Learn More
									</Button>
								</Link>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Sustainable Farming</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground mb-4">
									Empowering sustainability through farming projects that support
									our organization's activities.
								</p>
								<Link to="/projects">
									<Button variant="outline" className="w-full">
										Learn More
									</Button>
								</Link>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>International Exchange</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground mb-4">
									Fostering global connections through our volunteer exchange
									program.
								</p>
								<Link to="/volunteer">
									<Button variant="outline" className="w-full">
										Learn More
									</Button>
								</Link>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-6">Make a Difference Today</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Your support can help us continue our mission of empowering children and
						transforming lives.
					</p>
					<Link to="/support">
						<Button size="lg" variant="secondary">
							Support Our Cause
						</Button>
					</Link>
				</div>
			</section>
		</div>
	);
}
