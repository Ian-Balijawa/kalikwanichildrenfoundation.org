import { useDemands } from "@/hooks/useDemands";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DemandStatus, DemandType, ROLE } from "@/types/enums";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";

const statusColors: Record<DemandStatus, string> = {
	[DemandStatus.SOLUTION]: "bg-blue-500/10 text-blue-500",
	[DemandStatus.COMMERCIALS]: "bg-purple-500/10 text-purple-500",
	[DemandStatus.BUSINESS_APPROVAL]: "bg-orange-500/10 text-orange-500",
	[DemandStatus.DEVELOPMENT]: "bg-yellow-500/10 text-yellow-500",
	[DemandStatus.SHELF_READY]: "bg-green-500/10 text-green-500",
	[DemandStatus.SIT]: "bg-cyan-500/10 text-cyan-500",
	[DemandStatus.UAT]: "bg-pink-500/10 text-pink-500",
	[DemandStatus.CLOSED]: "bg-gray-500/10 text-gray-500",
};

// Recent activities data
const recentActivities = [
	{ title: "URS Received", project: "MTN" },
	{ title: "Clarification meeting", project: "MTN" },
	{ title: "Draft Solution", project: "MTN" },
	{ title: "Review Session with Demand Team", project: "MTN" },
	{ title: "Final Solution Submitted", project: "MTN" },
	{ title: "Development", project: "MTN" },
	{ title: "Testing", project: "MTN" },
];

export default function DemandsDashboard() {
	const { demands, isLoading } = useDemands({});
	const user = useAppSelector((state) => state.auth.user);

	// Calculate statistics
	const stats = {
		total: demands.length,
		inProgress: demands.filter((d) => d.status !== DemandStatus.CLOSED).length,
		completed: demands.filter((d) => d.status === DemandStatus.CLOSED).length,
		byType: Object.values(DemandType).reduce((acc, type) => {
			acc[type] = demands.filter((d) => d.demandType === type).length;
			return acc;
		}, {} as Record<string, number>),
		byStatus: Object.values(DemandStatus).reduce((acc, status) => {
			acc[status] = demands.filter((d) => d.status === status).length;
			return acc;
		}, {} as Record<string, number>),
	};

	return (
		<div className="p-6 space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">Demands Dashboard</h1>
					<p className="text-muted-foreground">Overview of all project demands</p>
				</div>
				<Button asChild>
					<Link to="/demands/new">Create New Demand</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recents Card */}
				<Card className="p-6">
					<h2 className="text-lg font-semibold mb-4">Recents</h2>
					<div className="space-y-3">
						{recentActivities.map((activity, index) => (
							<div key={index} className="flex items-center gap-3">
								<div className="w-2 h-2 rounded-full bg-primary" />
								<div className="flex-1">
									<p className="text-sm font-medium">{activity.title}</p>
									<p className="text-xs text-muted-foreground">
										In {activity.project}
									</p>
								</div>
							</div>
						))}
					</div>
				</Card>

				{/* My Tasks Card */}
				<Card className="p-6">
					<h2 className="text-lg font-semibold mb-4">My Tasks</h2>
					<Tabs defaultValue="todo" className="w-full">
						<TabsList className="mb-4">
							<TabsTrigger value="todo">To Do</TabsTrigger>
							<TabsTrigger value="done">Done</TabsTrigger>
							<TabsTrigger value="delegated">Delegated</TabsTrigger>
						</TabsList>
						<TabsContent value="todo">
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<span className="text-sm font-medium">Today</span>
										<span className="text-sm text-muted-foreground">0</span>
									</div>
									<Button variant="ghost" size="sm">
										<Plus className="h-4 w-4" />
									</Button>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<span className="text-sm font-medium">Overdue</span>
										<span className="text-sm text-muted-foreground">0</span>
									</div>
									<Button variant="ghost" size="sm">
										<Plus className="h-4 w-4" />
									</Button>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<span className="text-sm font-medium">Next</span>
										<span className="text-sm text-muted-foreground">0</span>
									</div>
									<Button variant="ghost" size="sm">
										<Plus className="h-4 w-4" />
									</Button>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<span className="text-sm font-medium">Unscheduled</span>
										<span className="text-sm text-muted-foreground">0</span>
									</div>
									<Button variant="ghost" size="sm">
										<Plus className="h-4 w-4" />
									</Button>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<span className="text-sm font-medium">Completed</span>
										<span className="text-sm text-muted-foreground">0</span>
									</div>
									<Button variant="ghost" size="sm">
										<Plus className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</TabsContent>
						<TabsContent value="done">
							<div className="text-center text-sm text-muted-foreground py-8">
								No completed tasks
							</div>
						</TabsContent>
						<TabsContent value="delegated">
							<div className="text-center text-sm text-muted-foreground py-8">
								No delegated tasks
							</div>
						</TabsContent>
					</Tabs>
				</Card>
			</div>

			{/* Stats Overview */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card className="p-6">
					<h3 className="text-sm font-medium text-muted-foreground">Total Demands</h3>
					<p className="text-2xl font-bold mt-2">{stats.total}</p>
				</Card>
				<Card className="p-6">
					<h3 className="text-sm font-medium text-muted-foreground">In Progress</h3>
					<p className="text-2xl font-bold mt-2">{stats.inProgress}</p>
				</Card>
				<Card className="p-6">
					<h3 className="text-sm font-medium text-muted-foreground">Completed</h3>
					<p className="text-2xl font-bold mt-2">{stats.completed}</p>
				</Card>
				<Card className="p-6">
					<h3 className="text-sm font-medium text-muted-foreground">Success Rate</h3>
					<p className="text-2xl font-bold mt-2">
						{stats.total ? ((stats.completed / stats.total) * 100).toFixed(0) : 0}%
					</p>
				</Card>
			</div>

			{/* Role-specific Views */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Status Distribution */}
				<Card className="p-6">
					<h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
					<div className="space-y-4">
						{Object.entries(stats.byStatus).map(([status, count]) => (
							<div key={status} className="space-y-2">
								<div className="flex justify-between text-sm">
									<span>{status}</span>
									<span>{count}</span>
								</div>
								<div className="h-2 bg-muted rounded-full overflow-hidden">
									<div
										className={cn(
											"h-full rounded-full",
											statusColors[status as DemandStatus]?.replace("/10", "")
										)}
										style={{ width: `${(count / stats.total) * 100}%` }}
									/>
								</div>
							</div>
						))}
					</div>
				</Card>

				{/* Recent Demands */}
				<Card className="p-6">
					<h3 className="text-lg font-semibold mb-4">Recent Demands</h3>
					<div className="space-y-4">
						{demands.slice(0, 5).map((demand) => (
							<div
								key={demand.id}
								className="flex items-center justify-between p-4 border rounded-lg"
							>
								<div>
									<Link
										to={`/demands/${demand.id}`}
										className="font-medium hover:underline"
									>
										{demand.title}
									</Link>
									<p className="text-sm text-muted-foreground">
										{demand.client.name}
									</p>
								</div>
								<Badge
									variant="secondary"
									className={cn(statusColors[demand.status as DemandStatus])}
								>
									{demand.status}
								</Badge>
							</div>
						))}
					</div>
				</Card>
			</div>

			{/* Role-specific Content */}
			{user?.role === ROLE.PROJECT_MANAGER && (
				<Card className="p-6">
					<h3 className="text-lg font-semibold mb-4">Project Manager Overview</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="p-4 border rounded-lg">
							<h4 className="font-medium">Team Allocation</h4>
							<p className="text-2xl font-bold mt-2">85%</p>
						</div>
						<div className="p-4 border rounded-lg">
							<h4 className="font-medium">Timeline Status</h4>
							<p className="text-2xl font-bold mt-2">On Track</p>
						</div>
						<div className="p-4 border rounded-lg">
							<h4 className="font-medium">Resource Utilization</h4>
							<p className="text-2xl font-bold mt-2">90%</p>
						</div>
					</div>
				</Card>
			)}

			{user?.role === ROLE.DEVELOPER && (
				<Card className="p-6">
					<h3 className="text-lg font-semibold mb-4">My Assigned Demands</h3>
					<div className="space-y-4">
						{demands
							.filter((d) => d.status === DemandStatus.DEVELOPMENT)
							.slice(0, 3)
							.map((demand) => (
								<div key={demand.id} className="p-4 border rounded-lg">
									<Link
										to={`/demands/${demand.id}`}
										className="font-medium hover:underline"
									>
										{demand.title}
									</Link>
									<p className="text-sm text-muted-foreground mt-1">
										{demand.demandSummary}
									</p>
								</div>
							))}
					</div>
				</Card>
			)}
		</div>
	);
}
