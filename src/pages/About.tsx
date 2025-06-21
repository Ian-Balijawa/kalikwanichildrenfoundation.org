import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const coreValues = [
	{
		title: "Compassion",
		description:
			"We are driven by a deep sense of empathy and a genuine desire to alleviate suffering and bring hope to the vulnerable.",
	},
	{
		title: "Integrity",
		description:
			"We uphold the highest standards of transparency, accountability, and ethical conduct in all our endeavors.",
	},
	{
		title: "Empowerment",
		description:
			"We believe in empowering children with the tools, knowledge, and skills they need to become self-reliant and create their own futures.",
	},
	{
		title: "Collaboration",
		description:
			"We actively seek partnerships with like-minded individuals, organizations, and communities to amplify our impact.",
	},
	{
		title: "Inclusivity",
		description:
			"We embrace diversity and ensure that every child, regardless of their background, feels valued, respected, and included.",
	},
	{
		title: "Advocacy",
		description:
			"We are committed to being a voice for the voiceless, raising awareness about the challenges faced by vulnerable children.",
	},
];

const directors = [
	{
		name: "Samuel Mwesigwa",
		role: "Director & CEO",
		image: "/team/Sam-Kalikwani-1.png",
		quote: "Welcome, everyone! I’m Samuel Mwesigwa, CEO and Director of Kalikwani Children’s Foundation. It’s an honor to lead this incredible organization dedicated to transforming lives.",
		details: [
			"At Kalikwani, we believe in the power of education, empowerment, and love. We’ve already made a significant impact, supporting over 50 children in accessing education through our partnerships with local schools. But our vision goes beyond just education. We’re committed to empowering teenagers with skills and knowledge to thrive in life. Our programs focus on mentorship, leadership development, and vocational training, preparing them for a bright future. But we can’t do it alone. We need your support to expand our initiatives, open new schools, hospitals, and homes for the most vulnerable. Your donation will help us:",
			"Provide educational resources and scholarships",
			"Establish vocational training centers",
			"Build hospitals and healthcare facilities",
			"Create safe homes for homeless children",
			"Join us in shaping a brighter future for these incredible young minds. Together, let’s break the cycle of poverty and create a legacy of hope. Thank you for your support. Let’s empower the next generation to soar!",
		],
	},
	{
		name: "Ivan Waiswa",
		role: "Director & Chief Advisor",
		image: "/team/Ivan-Waiswa-Advisor-Kalikwani-Childrens-Foundation-683x1024.png",
		quote: "Dear friends and supporters, As Director and Chief Advisor of Kalikwani Children’s Foundation, I’m privileged to lead a team of dedicated individuals who share a common vision: to create a brighter future for vulnerable children and teenagers.",
		details: [
			"Our journey began with a simple yet powerful idea: that every child deserves access to quality education, healthcare, and a loving home. Today, we’re proud to have made a significant impact in the lives of over 50 children, with many more waiting to benefit from our programs. But our work is far from over.",
			"We need your support to expand our initiatives, to reach more children, and to create a lasting legacy of hope. As a director and chief advisor, I’ve seen the power of collaboration and the impact of your donations.",
			"Let us work together to build a future where every child can thrive, where every teenager can access the skills and resources they need to succeed. Your donation is an investment in a child’s future, a chance to break the cycle of poverty and create a brighter tomorrow. Join us in shaping a better world, one child at a time. Thank you!",
		],
	},
	{
		name: "Jeremiah Buyinza",
		role: "Director & Permanent Secretary",
		image: "/team/Jeremiah-Buyinza.png",
		quote: "I’m Jeremiah Buyinza, Director and Permanent Secretary of Kalikwani Children’s Foundation. It’s a privilege to serve this noble organization dedicated to transforming the lives of vulnerable children and teenagers.",
		details: [
			"As Permanent Secretary, I’ve witnessed firsthand the impact of our programs. We’ve empowered over 50 children to access education, and countless teenagers have benefited from our skills and empowerment programs. But our work is far from over. We have a vision to expand our reach, opening new schools, hospitals, and homes for those who need it most. We require resources and support to make this vision a reality.",
			"I urge you to join us in this noble endeavor. Your donation will help us:",
			"Build new classrooms and educational facilities",
			"Establish healthcare services and hospitals",
			"Provide safe homes and orphanages for homeless children",
			"Empower teenagers with skills and mentorship",
			"Together, we can create a brighter future for these young lives. Let us unite to break the cycle of poverty and create a legacy of hope. Thank you for your support. Together, we can make a difference!",
		],
	},
	{
		name: "Benjamin Musasizi",
		role: "Head of Finance & Administration",
		image: "/team/IMG-20240708-WA0001.jpg",
		quote: "Dear esteemed guests and supporters, Am Benjamin Musasizi, As the Head of Finance and Administration at Kalikwani Children’s Foundation, I’m responsible for ensuring that our resources are allocated efficiently and effectively to support our mission.",
		details: [
			"I’m proud to report that our financial management has been prudent and transparent, allowing us to maximize the impact of your donations. Every shilling, every dollar, has been invested in creating a brighter future for the children and teenagers under our care.",
			"Our financial sustainability is crucial to the longevity of our programs. Your support has enabled us to:",
			"Build a robust financial framework",
			"Invest in essential infrastructure",
			"Develop a skilled and dedicated team",
			"I urge you to continue supporting our cause, knowing that your donation is a sound investment in the future of these young lives. Together, let’s build a financially sustainable organization that can continue to transform lives for generations to come. Thank you for your trust and support.",
		],
	},
];

const staff = [
	{
		name: "Jonathan Ndada",
		role: "Community Mobilizer",
		image: "/team/staff-856x1024.png",
		quote: "Unlocking Potential, Unbridling Hope",
		details: [
			"On this digital platform, I stand with pride, representing the Kalikwani Children’s Foundation. Our journey has been a testament to the transformative power of community and compassion.",
			"We have witnessed the resilience of young hearts, the determination of young minds, and the beauty of young souls. We have seen hope kindled, dreams ignited, and futures reshaped.",
			"Our mission is to nurture, to educate, and to empower. We strive to create a world where every child can laugh, learn, and thrive. A world where every child can become the master of their destiny.",
			"Together, let us break down barriers, let us bridge gaps, and let us build a brighter tomorrow. Let us unlock the potential within each child, and let us unbridle the hope that resides in every young heart.",
			"Join us in this noble endeavor. Let us write a new chapter in the story of Kalikwani, a chapter of triumph, of joy, and of unlimited possibility. Thank you.",
		],
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
						<p className="text-lg text-muted-foreground mb-6">
							Driven by their personal journey and a deep sense of gratitude, they
							embarked on a mission to establish the Kalikwani Children's Foundation.
							With unwavering commitment and an unyielding spirit, they focused on
							providing hope and empowerment to teenagers, vulnerable children, and
							those facing homelessness in our community.
						</p>
						<p className="text-lg text-muted-foreground">
							Kalikwani Children’s Foundation is dedicated to all people with the
							spirit of compassion with humility and all people are free to join it
							irrespective of any kind of discrimination, amongst others including
							religion, tribe, region, race, gender, color, status in society, and
							level of education.
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
					<h2 className="text-3xl font-bold mb-12 text-center">Meet the Directors</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
						{directors.map((member, index) => (
							<Card key={index} className="flex flex-col">
								<div className="relative w-full h-80">
									<img
										src={member.image}
										alt={member.name}
										className="w-full h-full object-cover rounded-t-lg"
									/>
								</div>
								<CardHeader>
									<CardTitle className="text-2xl">{member.name}</CardTitle>
									<p className="text-primary font-semibold">{member.role}</p>
								</CardHeader>
								<CardContent className="flex-grow">
									<blockquote className="italic text-muted-foreground border-l-4 pl-4 mb-4">
										{member.quote}
									</blockquote>
									<div className="text-muted-foreground space-y-3">
										{member.details.map((paragraph, i) => (
											<p key={i}>{paragraph}</p>
										))}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-12 text-center">Meet the Staff</h2>
					<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
						{staff.map((member, index) => (
							<Card key={index} className="flex flex-col">
								<div className="relative w-full h-80">
									<img
										src={member.image}
										alt={member.name}
										className="w-full h-full object-cover rounded-t-lg"
									/>
								</div>
								<CardHeader>
									<CardTitle className="text-2xl">{member.name}</CardTitle>
									<p className="text-primary font-semibold">{member.role}</p>
								</CardHeader>
								<CardContent className="flex-grow">
									<blockquote className="italic text-muted-foreground border-l-4 pl-4 mb-4">
										{member.quote}
									</blockquote>
									<div className="text-muted-foreground space-y-3">
										{member.details.map((paragraph, i) => (
											<p key={i}>{paragraph}</p>
										))}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
