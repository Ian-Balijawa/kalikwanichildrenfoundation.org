import { ResourcePage } from "@/components/layout/ResourcePage";

export default function AnnualReports() {
	return <ResourcePage
		title="Annual reports"
		intro="Learn more about our work and how we use support from our community."
		heading="Looking for a report?"
		message="There are no downloadable annual reports available on this site yet. Please contact our team for the information you need, or explore the projects currently featured here."
		primary={{ label: "Contact our team", to: "/contact" }}
		secondary={{ label: "Explore projects", to: "/projects" }}
	/>;
}
