import { useRoutes } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/auth/protected-route";
import Login from "@/pages/Login";
import TicketsList from "@/pages/Tickets/tickets.list";
import TicketsNew from "@/pages/Tickets/tickets.new";
import TicketsKanban from "@/pages/Tickets/tickets.kanban";
import TicketDetails from "@/pages/Tickets/tickets.details";
import DemandsList from "@/pages/Demands/demands.list";
import UsersDashboard from "@/pages/Users/users.dashboard";
import UsersList from "@/pages/Users/users.list";
import UsersNew from "@/pages/Users/users.new";
import UserDetails from "@/pages/Users/users.details";
import Unauthorized from "@/pages/unauthorized";
import NotFound from "@/pages/NotFound";
import TicketsDashboard from "@/pages/Tickets/tickets.dashboard";
import Dashboard from "@/pages/Dashboard";
import ClientsList from "@/pages/Clients/clients.list";
import ClientsNew from "@/pages/Clients/clients.new";
import ClientsDetails from "@/pages/Clients/clients.details";
import EmailsInbox from "@/pages/Emails/emails.inbox";
import EmailsSent from "@/pages/Emails/email.sent";
import EmailsDrafts from "@/pages/Emails/emails.drafts";
import EmailsTrash from "@/pages/Emails/emails.trash";
import EmailsNew from "@/pages/Emails/emails.new";
import EmailDetails from "@/pages/Emails/email.details";
import DemandsDashboard from "@/pages/Demands/demands.dashboard";
import DemandsNew from "@/pages/Demands/demands.new";
import DemandsDetails from "@/pages/Demands/demands.details";
import WorkplanDetails from "@/pages/Demands/workplan.details";

export function AppRoutes() {
	const routes = useRoutes([
		{
			path: "/login",
			element: <Login />,
		},
		{
			path: "/",
			element: (
				<ProtectedRoute>
					<AppLayout />
				</ProtectedRoute>
			),
			children: [
				{
					index: true,
					element: <Dashboard />,
				},
				{
					path: "tickets",
					children: [
						{ index: true, element: <TicketsDashboard /> },
						{ path: "list", element: <TicketsList /> },
						{ path: "new", element: <TicketsNew /> },
						{ path: "board", element: <TicketsKanban /> },
						{ path: ":id", element: <TicketDetails /> },
					],
				},
				{
					path: "users",
					children: [
						{ index: true, element: <UsersDashboard /> },
						{ path: "list", element: <UsersList /> },
						{ path: "new", element: <UsersNew /> },
						{ path: ":id", element: <UserDetails /> },
					],
				},
				{
					path: "clients",
					children: [
						{ index: true, element: <ClientsList /> },
						{ path: "list", element: <ClientsList /> },
						{ path: "new", element: <ClientsNew /> },
						{ path: ":id", element: <ClientsDetails /> },
					],
				},
				{
					path: "demands",
					children: [
						{ index: true, element: <DemandsDashboard /> },
						{ path: "list", element: <DemandsList /> },
						{ path: ":id", element: <DemandsDetails /> },
						{ path: "new", element: <DemandsNew /> },
						{ path: ":demandId/workplans/:workPlanId", element: <WorkplanDetails /> },
					],
				},
				{
					path: "emails",
					children: [
						{ index: true, element: <EmailsInbox /> },
						{ path: "new", element: <EmailsNew /> },
						{ path: "inbox", element: <EmailsInbox /> },
						{ path: ":id", element: <EmailDetails /> },
						{ path: "sent", element: <EmailsSent /> },
						{ path: "drafts", element: <EmailsDrafts /> },
						{ path: "trash", element: <EmailsTrash /> },
					],
				},
				{
					path: "unauthorized",
					element: <Unauthorized />,
				},
				{
					path: "*",
					element: <NotFound />,
				},
			],
		},
	]);

	return routes;
}
