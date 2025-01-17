import { useRoutes } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import NotFound from "@/pages/NotFound";

import Home from "@/pages/Home";
import About from "@/pages/About";
import AnnualReports from "@/pages/AnnualReports";
import Gallery from "@/pages/Gallery";
import GetInvolved from "@/pages/GetInvolved";
import ImpactStories from "@/pages/ImpactStories";
import News from "@/pages/News";
import Partnerships from "@/pages/Partnerships";
import Programs from "@/pages/Programs";
import Projects from "@/pages/Projects";
import Scholarship from "@/pages/Scholarship";
import Support from "@/pages/Support";
import Team from "@/pages/Team";
import VolunteerOpportunities from "@/pages/VolunteerOpportunities";
import Contact from "@/pages/Contact";

export function AppRoutes() {
	const routes = useRoutes([
		{
			path: "/",
			element: <PublicLayout />,
			children: [
				{ index: true, element: <Home /> },
				{ path: "about", element: <About /> },
				{ path: "programs", element: <Programs /> },
				{ path: "gallery", element: <Gallery /> },
				{ path: "get-involved", element: <GetInvolved /> },
				{ path: "contact", element: <Contact /> },
				{ path: "news", element: <News /> },
				{ path: "impact-stories", element: <ImpactStories /> },
				{ path: "team", element: <Team /> },
				{ path: "scholarship", element: <Scholarship /> },
				{ path: "volunteer", element: <VolunteerOpportunities /> },
				{ path: "partnerships", element: <Partnerships /> },
				{ path: "projects", element: <Projects /> },
				{ path: "support", element: <Support /> },
				{ path: "annual-reports", element: <AnnualReports /> },
			],
		},
		{
			path: "*",
			element: <NotFound />,
		},
	]);

	return routes;
}
