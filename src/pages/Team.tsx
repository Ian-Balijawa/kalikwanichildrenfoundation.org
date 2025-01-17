import { Card, CardContent } from "@/components/ui/card";

// Sample team data - replace with actual data
const leadership = [
	{
		id: 1,
		name: "Kalikwani Godfrey",
		role: "Founder & Executive Director",
		bio: "With over 15 years of experience in community development and education, Godfrey founded KCF to create lasting positive change in his home community of Busota.",
		image: "/images/team/godfrey.jpg",
		email: "godfrey@kalikwanichildrenfoundation.org",
	},
	{
		id: 2,
		name: "Sarah Nabirye",
		role: "Programs Director",
		bio: "Sarah oversees all educational and community development programs, ensuring they align with our mission and create maximum impact.",
		image: "/images/team/sarah.jpg",
		email: "sarah@kalikwanichildrenfoundation.org",
	},
];

const staff = [
	{
		id: 1,
		name: "John Mukisa",
		role: "Education Coordinator",
		bio: "John coordinates our educational programs and mentorship initiatives, working closely with schools and students.",
		image: "/images/team/john.jpg",
	},
	{
		id: 2,
		name: "Mary Namukose",
		role: "Community Outreach Officer",
		bio: "Mary leads our community engagement efforts and manages relationships with local partners and families.",
		image: "/images/team/mary.jpg",
	},
	{
		id: 3,
		name: "Peter Isabirye",
		role: "Agricultural Projects Manager",
		bio: "Peter manages our sustainable farming initiatives and provides training to community members.",
		image: "/images/team/peter.jpg",
	},
];

const board = [
	{
		id: 1,
		name: "Dr. James Muwanga",
		role: "Board Chairman",
		bio: "Dr. Muwanga brings extensive experience in education policy and non-profit governance.",
		image: "/images/team/james.jpg",
	},
	{
		id: 2,
		name: "Grace Babirye",
		role: "Board Secretary",
		bio: "Grace is a legal professional specializing in non-profit law and child protection policies.",
		image: "/images/team/grace.jpg",
	},
];

export default function Team() {
	return (
		<div>
			{/* Hero Section */}
			<section className="bg-muted py-20">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-center mb-6">Our Team</h1>
					<p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
						Meet the dedicated individuals who work tirelessly to make our mission a
						reality. Our team combines local knowledge with professional expertise to
						create lasting impact.
					</p>
				</div>
			</section>

			{/* Leadership Team */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{leadership.map((member) => (
							<Card key={member.id} className="overflow-hidden">
								<div className="aspect-[4/3] relative">
									{/* Replace with actual image component */}
									<div
										className="w-full h-full bg-cover bg-center"
										style={{ backgroundImage: `url(${member.image})` }}
									/>
								</div>
								<CardContent className="p-6">
									<h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
									<p className="text-primary font-medium mb-4">{member.role}</p>
									<p className="text-muted-foreground mb-4">{member.bio}</p>
									<a
										href={`mailto:${member.email}`}
										className="text-primary hover:underline"
									>
										{member.email}
									</a>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Staff */}
			<section className="py-20 bg-muted">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Our Staff</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{staff.map((member) => (
							<Card key={member.id}>
								<div className="aspect-square relative">
									{/* Replace with actual image component */}
									<div
										className="w-full h-full bg-cover bg-center"
										style={{ backgroundImage: `url(${member.image})` }}
									/>
								</div>
								<CardContent className="p-6">
									<h3 className="text-xl font-semibold mb-2">{member.name}</h3>
									<p className="text-primary font-medium mb-4">{member.role}</p>
									<p className="text-muted-foreground">{member.bio}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Board of Directors */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Board of Directors</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{board.map((member) => (
							<Card key={member.id} className="flex flex-col md:flex-row">
								<div className="w-full md:w-1/3">
									{/* Replace with actual image component */}
									<div
										className="w-full h-full min-h-[200px] bg-cover bg-center"
										style={{ backgroundImage: `url(${member.image})` }}
									/>
								</div>
								<CardContent className="p-6 flex-1">
									<h3 className="text-xl font-semibold mb-2">{member.name}</h3>
									<p className="text-primary font-medium mb-4">{member.role}</p>
									<p className="text-muted-foreground">{member.bio}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-12">Our Values</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div>
							<h3 className="text-xl font-semibold mb-4">Integrity</h3>
							<p>
								We maintain the highest standards of transparency and accountability
								in all our operations.
							</p>
						</div>
						<div>
							<h3 className="text-xl font-semibold mb-4">Community-Driven</h3>
							<p>
								Our work is guided by the needs and aspirations of the communities
								we serve.
							</p>
						</div>
						<div>
							<h3 className="text-xl font-semibold mb-4">Empowerment</h3>
							<p>
								We believe in empowering individuals to become agents of positive
								change.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
