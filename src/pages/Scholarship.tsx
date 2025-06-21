import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Scholarship() {
	return (
		<div>
			{/* Hero Section */}
			<section className="bg-muted py-20">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-center mb-6">Education</h1>
					<p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
						Some call it Scholarship, we call it Subsidy
					</p>
				</div>
			</section>

			{/* Main Content */}
			<section className="py-20">
				<div className="container mx-auto px-4 max-w-4xl">
					<div className="space-y-12">
						<div>
							<h2 className="text-3xl font-bold mb-4">
								Empowering Young Minds through Education
							</h2>
							<p className="text-lg text-muted-foreground">
								At Kalikwani Children’s Foundation, we believe that education is the
								key to unlocking a brighter future for vulnerable children. Our
								Education Support Program is designed to provide access to better
								education for children who need it most.
							</p>
						</div>

						<Card>
							<CardHeader>
								<CardTitle>Our Approach</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-muted-foreground">
									We provide broad educational support to over 50 children at
									various educational levels, from primary to secondary and
									beyond. Our support includes:
								</p>
								<ul className="list-disc pl-5 space-y-2 text-muted-foreground">
									<li>Securing bursaries to cover school fees.</li>
									<li>Paying school fees to ensure uninterrupted learning.</li>
									<li>
										Providing essential school necessities, such as uniforms,
										books, and stationery.
									</li>
								</ul>
							</CardContent>
						</Card>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<Card>
								<CardHeader>
									<CardTitle>Eligibility and Selection</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Our bursary scheme is open to children who meet our
										eligibility criteria. Successful applicants are selected
										based on their academic potential, financial need, and
										personal circumstances.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader>
									<CardTitle>Renewal and Progression</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Our bursary is renewable annually, subject to satisfactory
										academic performance and adherence to our terms. We monitor
										the progress of our beneficiaries and provide ongoing
										support to ensure they reach their full potential.
									</p>
								</CardContent>
							</Card>
						</div>

						<div>
							<h3 className="text-2xl font-bold mb-4">
								Join Us in Empowering Young Minds
							</h3>
							<p className="text-lg text-muted-foreground">
								By supporting our Education Support Program, you can provide
								vulnerable children with the education they deserve. Together, we
								can unlock their potential and create a brighter future for
								generations to come. Remember, helping one child reach his
								paramount, you will be helping his future family and off springs.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20 bg-muted">
				<div className="container mx-auto px-4 text-center max-w-4xl">
					<h2 className="text-3xl font-bold mb-6">Get Involved</h2>
					<div className="space-y-4 text-lg text-muted-foreground mb-8">
						<p>
							Can you do anything to support our education program? Is there a way for
							you personally to get involved in even one child’s education?
						</p>
						<p>
							Tell us how you think you can help to make a difference in their lives.
						</p>
					</div>
					<div className="flex justify-center gap-4">
						<a href="/docs/KCF-Scholarship-Application-Form.docx" download>
							<Button size="lg">Download Form</Button>
						</a>
						<Link to="/contact">
							<Button size="lg" variant="outline">
								Contact Us
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
