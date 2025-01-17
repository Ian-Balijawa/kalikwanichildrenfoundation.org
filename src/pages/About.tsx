import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const coreValues = [
	{
		title: "Compassion",
		description:
			"We approach our work with empathy, understanding and sensitivity to the needs and experiences of children in vulnerable situations.",
	},
	{
		title: "Integrity",
		description:
			"We uphold the highest ethical standards, ensuring transparency, accountability and professionalism in all our actions and interactions.",
	},
	{
		title: "Collaboration",
		description:
			"We value partnerships and collaborations with community members and other organizations to maximize our impact.",
	},
	{
		title: "Empowerment",
		description:
			"We believe in empowering children and youth, enabling them to take control of their lives, make positive choices and become agents of change.",
	},
	{
		title: "Respect",
		description:
			"We treat all individuals with respect, dignity and equality, valuing their diverse backgrounds, opinions and contributions.",
	},
	{
		title: "Excellence",
		description:
			"We strive for excellence in everything we do, continuously seeking innovation, improvement and evidence-based practices in our programs and services.",
	},
];

const teamMembers = [
	{
		name: "Kalikwani Mwesigwa Samuel",
		role: "Executive Director",
		contact: "+256701 952867",
		email: "kalikwanimwesigwasamuel@gmail.com",
	},
	{
		name: "Kagoda Fred Jackson",
		role: "Deputy Executive Director",
		contact: "+256754 507556",
		email: "kagodafredjackson5@gmail.com",
	},
	{
		name: "Ndada Jonathan",
		role: "Community Mobilizer",
		contact: "+25674 1343527",
		email: "ndadajonathan96@gmail.com",
	},
	{
		name: "Buyinza Jeremiah",
		role: "Permanent Secretary",
		contact: "+256708 342530",
		email: "buyinzajeremiah1@gmail.com",
	},
];

export default function About() {
	return (
		<div>
			{/* Hero Section */}
			<section className="bg-muted py-20">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-center mb-6">About KCF</h1>
					<p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
						Kalikwani Children's Foundation (KCF) is a non-profit charitable foundation
						dedicated to creating positive change in the lives of vulnerable children
						and teenagers in Kamuli, Uganda.
					</p>
				</div>
			</section>

			{/* Vision & Mission */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						<div>
							<h2 className="text-3xl font-bold mb-6">Our Vision</h2>
							<p className="text-lg text-muted-foreground">
								Our vision is a society where every child, regardless of their
								circumstances, has equal opportunities to thrive, grow and reach
								their full potential.
							</p>
						</div>
						<div>
							<h2 className="text-3xl font-bold mb-6">Our Mission</h2>
							<p className="text-lg text-muted-foreground">
								To create a safe nurturing environment for teenagers, vulnerable and
								homeless children, providing them with access to education, shelter,
								life skills and advocacy support, enabling them to break the cycle
								of poverty and build a better future for themselves.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* History */}
			<section className="py-20 bg-muted">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
					<div className="max-w-4xl mx-auto">
						<p className="text-lg text-muted-foreground mb-6">
							At the heart of our foundation lies a personal story of resilience and
							determination. The founders lost their beloved mother at a tender age.
							Left with a void that could not be easily filled, they faced numerous
							challenges and uncertainties. Their dreams seemed unreachable as their
							father, retired from his electrician job, struggled to make ends meet.
							Unfortunately, he also passed away a few years after his retirement.
						</p>
						<p className="text-lg text-muted-foreground mb-6">
							In the face of adversity, the brothers found support and solace in their
							big brother, who selflessly sacrificed his own education to ensure that
							they had a chance at a brighter future. This act of love and sacrifice
							became the foundation of their resolution to make a difference in the
							lives of other children facing similar obstacles.
						</p>
						<p className="text-lg text-muted-foreground">
							Driven by their personal journey and a deep sense of gratitude, they
							embarked on a mission to establish the Kalikwani Children's Foundation.
							With unwavering commitment and an unyielding spirit, they focused on
							providing hope and empowerment to teenagers, vulnerable children, and
							those facing homelessness in our community.
						</p>
					</div>
				</div>
			</section>

			{/* Core Values */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{coreValues.map((value, index) => (
							<Card key={index}>
								<CardHeader>
									<CardTitle className="text-xl">{value.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">{value.description}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Team */}
			<section className="py-20 bg-muted">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{teamMembers.map((member, index) => (
							<Card key={index}>
								<CardHeader>
									<CardTitle className="text-xl">{member.name}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="font-medium text-primary mb-2">{member.role}</p>
									<p className="text-sm text-muted-foreground mb-1">
										{member.contact}
									</p>
									<p className="text-sm text-muted-foreground">{member.email}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
