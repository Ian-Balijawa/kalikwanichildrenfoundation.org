import { useRoutes } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/components/auth/protected-route";
import Login from "@/pages/Login";
import UsersDashboard from "@/pages/Users/users.dashboard";
import UsersList from "@/pages/Users/users.list";
import UsersNew from "@/pages/Users/users.new";
import UserDetails from "@/pages/Users/users.details";
import Unauthorized from "@/pages/unauthorized";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";

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
					path: "users",
					children: [
						{ index: true, element: <UsersDashboard /> },
						{ path: "list", element: <UsersList /> },
						{ path: "new", element: <UsersNew /> },
						{ path: ":id", element: <UserDetails /> },
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
