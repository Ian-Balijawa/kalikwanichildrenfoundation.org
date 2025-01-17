import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

// Sample reports data - replace with actual data
const reports = [
	{
		id: 1,
		year: "2023",
		title: "Annual Impact Report 2023",
		description:
			"A comprehensive overview of our programs, impact, and financial performance in 2023.",
		coverImage: "/images/reports/2023-cover.jpg",
		fileSize: "5.2 MB",
		highlights: [
			"Served 1,200+ children through education programs",
			"Launched new healthcare outreach initiative",
			"Expanded agricultural training to 5 new communities",
			"Achieved 95% program efficiency rate",
		],
		financials: {
			totalRevenue: "$450,000",
			programExpenses: "$380,000",
			administrativeExpenses: "$45,000",
			fundraisingExpenses: "$25,000",
		},
	},
	{
		id: 2,
		year: "2022",
		title: "Annual Impact Report 2022",
		description:
			"Detailed report on our achievements, challenges, and financial stewardship in 2022.",
		coverImage: "/images/reports/2022-cover.jpg",
		fileSize: "4.8 MB",
		highlights: [
			"Supported 950 children in education",
			"Completed construction of new classroom block",
			"Initiated sustainable farming program",
			"Established new community partnerships",
		],
		financials: {
			totalRevenue: "$380,000",
			programExpenses: "$315,000",
			administrativeExpenses: "$40,000",
			fundraisingExpenses: "$25,000",
		},
	},
	{
		id: 3,
		year: "2021",
		title: "Annual Impact Report 2021",
		description:
			"Our journey through 2021, highlighting our impact and financial accountability.",
		coverImage: "/images/reports/2021-cover.jpg",
		fileSize: "4.5 MB",
		highlights: [
			"Reached 800 children through programs",
			"Launched COVID-19 response initiative",
			"Started vocational training program",
			"Enhanced monitoring and evaluation systems",
		],
		financials: {
			totalRevenue: "$320,000",
			programExpenses: "$265,000",
			administrativeExpenses: "$35,000",
			fundraisingExpenses: "$20,000",
		},
	},
];

const years = ["All", "2023", "2022", "2021"];

export default function AnnualReports() {
	const [selectedYear, setSelectedYear] = useState("All");

	const filteredReports = reports.filter(
		(report) => selectedYear === "All" || report.year === selectedYear
	);

	return (
		<div>
			{/* Hero Section */}
			<section className="bg-muted py-20">
				<div className="container mx-auto px-4">
					<h1 className="text-4xl font-bold text-center mb-6">Annual Reports</h1>
					<p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
						Explore our annual reports to learn about our impact, achievements, and
						financial stewardship. We are committed to transparency and accountability
						in all our operations.
					</p>
				</div>
			</section>

			{/* Filters */}
			<section className="py-8 border-b">
				<div className="container mx-auto px-4">
					<div className="flex flex-col md:flex-row gap-4 justify-center items-center">
						<div className="w-full md:w-48">
							<Select value={selectedYear} onValueChange={setSelectedYear}>
								<SelectTrigger>
									<SelectValue placeholder="Select Year" />
								</SelectTrigger>
								<SelectContent>
									{years.map((year) => (
										<SelectItem key={year} value={year}>
											{year}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<Button variant="outline" onClick={() => setSelectedYear("All")}>
							Reset Filter
						</Button>
					</div>
				</div>
			</section>

			{/* Reports Grid */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 gap-12">
						{filteredReports.map((report) => (
							<Card key={report.id} className="overflow-hidden">
								<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
									<div className="lg:col-span-1">
										<div className="aspect-[3/4] bg-muted">
											{/* Replace with actual image component */}
											<div
												className="w-full h-full bg-cover bg-center"
												style={{
													backgroundImage: `url(${report.coverImage})`,
												}}
											/>
										</div>
									</div>
									<div className="lg:col-span-2 p-6">
										<CardHeader className="p-0 mb-6">
											<CardTitle className="text-2xl mb-2">
												{report.title}
											</CardTitle>
											<p className="text-muted-foreground">
												{report.description}
											</p>
										</CardHeader>
										<CardContent className="p-0">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
												<div>
													<h3 className="text-lg font-semibold mb-4">
														Key Highlights
													</h3>
													<ul className="list-disc pl-5 space-y-2 text-muted-foreground">
														{report.highlights.map(
															(highlight, index) => (
																<li key={index}>{highlight}</li>
															)
														)}
													</ul>
												</div>
												<div>
													<h3 className="text-lg font-semibold mb-4">
														Financial Overview
													</h3>
													<div className="space-y-2 text-muted-foreground">
														<p>
															Total Revenue:{" "}
															{report.financials.totalRevenue}
														</p>
														<p>
															Program Expenses:{" "}
															{report.financials.programExpenses}
														</p>
														<p>
															Administrative:{" "}
															{
																report.financials
																	.administrativeExpenses
															}
														</p>
														<p>
															Fundraising:{" "}
															{report.financials.fundraisingExpenses}
														</p>
													</div>
												</div>
											</div>
											<div className="mt-8 flex items-center gap-4">
												<Button>Download Report ({report.fileSize})</Button>
												<Button variant="outline">View Online</Button>
											</div>
										</CardContent>
									</div>
								</div>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Financial Transparency */}
			<section className="py-20 bg-muted">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">
						Our Commitment to Transparency
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
						<Card>
							<CardContent className="p-6">
								<div className="text-4xl mb-4">📊</div>
								<h3 className="text-xl font-semibold mb-2">
									Financial Accountability
								</h3>
								<p className="text-muted-foreground">
									We maintain strict financial controls and undergo annual audits
									to ensure proper stewardship of donations.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="text-4xl mb-4">📈</div>
								<h3 className="text-xl font-semibold mb-2">Impact Measurement</h3>
								<p className="text-muted-foreground">
									Regular monitoring and evaluation help us measure and improve
									the effectiveness of our programs.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<div className="text-4xl mb-4">🤝</div>
								<h3 className="text-xl font-semibold mb-2">Donor Communication</h3>
								<p className="text-muted-foreground">
									We provide regular updates to our donors about how their
									contributions are making a difference.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-20 bg-primary text-primary-foreground">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-6">Support Our Mission</h2>
					<p className="text-xl mb-8 max-w-2xl mx-auto">
						Your support helps us continue our work in empowering children and
						communities. Make a difference today.
					</p>
					<div className="flex justify-center gap-4">
						<Button size="lg" variant="secondary">
							Donate Now
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="bg-white/10 hover:bg-white/20"
						>
							Contact Us
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
