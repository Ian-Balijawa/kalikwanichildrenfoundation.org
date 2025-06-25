import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaWhatsapp } from "react-icons/fa";

// Hero slider images
const heroImages = [
	"/images/IMG-20250123-WA0146.jpg",
	"/images/IMG-20250123-WA0145.jpg",
	"/images/IMG-20250123-WA0144.jpg",
	"/images/IMG-20250123-WA0143.jpg",
];

export default function Home() {
	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		fade: true,
		cssEase: "linear",
		arrows: false,
	};

	return (
		<div>
			{/* Hero Section */}
			<section className="relative h-[800px] flex items-center justify-center text-white">
				<div className="absolute inset-0 bg-black/50 z-10" />
				<div className="absolute inset-0">
					<Slider {...sliderSettings} className="h-full">
						{heroImages.map((image, index) => (
							<div key={index} className="h-[800px]">
								<div
									className="w-full h-full bg-cover bg-center"
									style={{ backgroundImage: `url('${image}')` }}
								/>
							</div>
						))}
					</Slider>
				</div>
				<div className="container mx-auto px-4 relative z-20 text-center">
					<h1 className="text-5xl font-bold mb-4">
						Kalikwani Children's Foundation (KCF)
					</h1>
					<p className="text-2xl italic font-semibold mb-6 text-primary-foreground">
						Empowering Children, Transforming Lives
					</p>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Join us in our mission to create a society where every child has equal
						opportunities to thrive, grow, and reach their full potential.
					</p>
					<div className="px-4 flex justify-center gap-4 flex-wrap">
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
					<div className="px-4 flex justify-center mt-4">
						<Button
							size="lg"
							variant="outline"
							className="bg-green flex items-center gap-2 w-full max-w-xs"
							onClick={() => {
								window.open(
									"https://api.whatsapp.com/send/?phone=%2B256764969385&text&type=phone_number&app_absent=0",
									"_blank"
								);
							}}
						>
							<FaWhatsapp className="inline-block" />
							WhatsApp
						</Button>
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
									5
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
