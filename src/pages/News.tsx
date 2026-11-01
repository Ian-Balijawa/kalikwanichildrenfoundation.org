import { ResourcePage } from "@/components/layout/ResourcePage";

export default function News() {
	return <ResourcePage
		title="News & updates"
		intro="Follow the work of Kalikwani Children’s Support Centre in Kamuli, Uganda."
		heading="See what we’re working on."
		message="We don’t have published news articles available here yet. In the meantime, you can explore our current projects and see photos from our community work."
		image="/images/IMG-20250624-WA0018.jpg"
		imageAlt="Children and community members holding learning materials outdoors"
		primary={{ label: "Explore projects", to: "/projects" }}
		secondary={{ label: "View gallery", to: "/gallery" }}
	/>;
}
