import { useUsers } from "@/hooks/useUsers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROLE } from "@/types/api";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Users, Shield, Activity, Clock } from "lucide-react";

// Dummy data for analytics
const dummyAnalytics = {
	summary: {
		totalUsers: 48,
		activeUsers: 42,
		onlineUsers: 28,
		onDutyUsers: 15,
		usersByRole: {
			[ROLE.ADMIN]: 3,
			[ROLE.SUPPORT]: 5,
			[ROLE.DEVELOPER]: 20,
			[ROLE.SUPPORT_ADMIN]: 15,
			[ROLE.CUSTOMER]: 5,
		},
		userActivity: {
			lastWeek: 35,
			thisWeek: 42,
			trend: "+20%",
		},
		onlineStatus: {
			online: 28,
			offline: 14,
			away: 6,
		},
		dutyStatus: {
			onDuty: 15,
			onLeave: 3,
			available: 30,
		},
	},
};

const roleColors: Record<ROLE, string> = {
	[ROLE.ADMIN]: "bg-purple-500/10 text-purple-500",
	[ROLE.SUPPORT_ADMIN]: "bg-indigo-500/10 text-indigo-500",
	[ROLE.DEVELOPER]: "bg-blue-500/10 text-blue-500",
	[ROLE.SUPPORT]: "bg-green-500/10 text-green-500",
	[ROLE.CUSTOMER]: "bg-gray-500/10 text-gray-500",
	[ROLE.BA]: "bg-orange-500/10 text-orange-500",
	["Super User"]: "bg-red-500/10 text-red-500",
	[ROLE.PROJECT_MANAGER]: "bg-yellow-500/10 text-yellow-500",
	[ROLE.QUALITY_ANALYST]: "bg-pink-500/10 text-pink-500",
};

export default function UsersDashboard() {
	const navigate = useNavigate();
	const { users } = useUsers();

	// Get recent users (last 5)
	const recentUsers = users
		?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
		.slice(0, 5);

	return (
		<div className="p-4 md:p-6 space-y-6">
			{/* Stats Overview */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">Total Users</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{dummyAnalytics.summary.totalUsers}
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							{dummyAnalytics.summary.userActivity.trend} from last week
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">Online Users</CardTitle>
						<Activity className="h-4 w-4 text-green-500" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{dummyAnalytics.summary.onlineUsers}
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							{dummyAnalytics.summary.onlineStatus.away} users away
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">On Duty</CardTitle>
						<Clock className="h-4 w-4 text-blue-500" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{dummyAnalytics.summary.onDutyUsers}
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							{dummyAnalytics.summary.dutyStatus.onLeave} users on leave
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">Active Roles</CardTitle>
						<Shield className="h-4 w-4 text-purple-500" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{Object.keys(dummyAnalytics.summary.usersByRole).length}
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							{dummyAnalytics.summary.usersByRole[ROLE.ADMIN]} admin users
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Recent Users and Analytics */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recent Users */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle>Recent Users</CardTitle>
						<Button variant="ghost" size="sm" onClick={() => navigate("/users/list")}>
							View All
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{recentUsers?.map((user) => (
								<div
									key={user.id}
									className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
									onClick={() => navigate(`/users/${user.id}`)}
								>
									<div className="flex items-center gap-3">
										<div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
											{user.firstname[0]}
											{user.lastname[0]}
										</div>
										<div>
											<div className="font-medium">
												{user.firstname} {user.lastname}
											</div>
											<div className="text-sm text-muted-foreground">
												{user.email}
											</div>
										</div>
									</div>
									<Badge
										variant="secondary"
										className={cn(roleColors[user.role as ROLE])}
									>
										{user.role}
									</Badge>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* User Distribution */}
				<div className="grid grid-cols-1 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Role Distribution</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{Object.entries(dummyAnalytics.summary.usersByRole).map(
									([role, count]) => (
										<div key={role} className="space-y-2">
											<div className="flex items-center justify-between text-sm">
												<span className="capitalize">
													{role.toLowerCase()}
												</span>
												<span className="font-medium">{count}</span>
											</div>
											<div className="h-2 rounded-full bg-muted overflow-hidden">
												<div
													className={cn(
														"h-full rounded-full",
														roleColors[role as ROLE].replace("/10", "")
													)}
													style={{
														width: `${
															(count /
																dummyAnalytics.summary.totalUsers) *
															100
														}%`,
													}}
												/>
											</div>
										</div>
									)
								)}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Status Distribution</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="space-y-2">
									<div className="flex items-center justify-between text-sm">
										<span>Online</span>
										<span className="font-medium">
											{dummyAnalytics.summary.onlineStatus.online}
										</span>
									</div>
									<div className="h-2 rounded-full bg-muted overflow-hidden">
										<div
											className="h-full rounded-full bg-green-500"
											style={{
												width: `${
													(dummyAnalytics.summary.onlineStatus.online /
														dummyAnalytics.summary.totalUsers) *
													100
												}%`,
											}}
										/>
									</div>
								</div>
								<div className="space-y-2">
									<div className="flex items-center justify-between text-sm">
										<span>On Duty</span>
										<span className="font-medium">
											{dummyAnalytics.summary.dutyStatus.onDuty}
										</span>
									</div>
									<div className="h-2 rounded-full bg-muted overflow-hidden">
										<div
											className="h-full rounded-full bg-blue-500"
											style={{
												width: `${
													(dummyAnalytics.summary.dutyStatus.onDuty /
														dummyAnalytics.summary.totalUsers) *
													100
												}%`,
											}}
										/>
									</div>
								</div>
								<div className="space-y-2">
									<div className="flex items-center justify-between text-sm">
										<span>On Leave</span>
										<span className="font-medium">
											{dummyAnalytics.summary.dutyStatus.onLeave}
										</span>
									</div>
									<div className="h-2 rounded-full bg-muted overflow-hidden">
										<div
											className="h-full rounded-full bg-orange-500"
											style={{
												width: `${
													(dummyAnalytics.summary.dutyStatus.onLeave /
														dummyAnalytics.summary.totalUsers) *
													100
												}%`,
											}}
										/>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
