import { useTickets } from "@/hooks/useTickets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TicketStatus, TicketPriority } from "@/types/api";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Ticket, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";

// Dummy data for analytics
const dummyAnalytics = {
	summary: {
		totalTickets: 156,
		ticketsThisWeek: 23,
		averageResponseTime: "2.5 hours",
		resolutionRate: "85%",
		ticketsByPriority: {
			[TicketPriority.LOW]: 45,
			[TicketPriority.MEDIUM]: 67,
			[TicketPriority.HIGH]: 34,
			[TicketPriority.URGENT]: 10,
		},
		ticketsByStatus: {
			[TicketStatus.OPEN]: 42,
			[TicketStatus.IN_PROGRESS]: 38,
			[TicketStatus.RESOLVED]: 45,
			[TicketStatus.CLOSED]: 21,
			[TicketStatus.BLOCKED]: 10,
		},
		ticketTrends: {
			lastWeek: 18,
			thisWeek: 23,
			trend: "+27.8%",
		},
	},
	userTicketCountByStatus: [
		{ userId: "1", status: TicketStatus.OPEN, count: 12 },
		{ userId: "1", status: TicketStatus.IN_PROGRESS, count: 8 },
		{ userId: "2", status: TicketStatus.OPEN, count: 15 },
		{ userId: "2", status: TicketStatus.BLOCKED, count: 5 },
	],
};

const statusColors: Record<TicketStatus, string> = {
	[TicketStatus.OPEN]: "bg-yellow-500/10 text-yellow-500",
	[TicketStatus.IN_PROGRESS]: "bg-blue-500/10 text-blue-500",
	[TicketStatus.RESOLVED]: "bg-green-500/10 text-green-500",
	[TicketStatus.CLOSED]: "bg-gray-500/10 text-gray-500",
	[TicketStatus.BLOCKED]: "bg-red-500/10 text-red-500",
};

const priorityColors: Record<TicketPriority, string> = {
	[TicketPriority.LOW]: "bg-gray-500/10 text-gray-500",
	[TicketPriority.MEDIUM]: "bg-blue-500/10 text-blue-500",
	[TicketPriority.HIGH]: "bg-orange-500/10 text-orange-500",
	[TicketPriority.URGENT]: "bg-red-500/10 text-red-500",
};

export default function TicketsDashboard() {
	const navigate = useNavigate();
	const { tickets } = useTickets();

	// Get recent tickets (last 5)
	const recentTickets = tickets
		?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
		.slice(0, 5);

	// Calculate ticket statistics using dummy data
	const ticketStats = {
		total: dummyAnalytics.summary.totalTickets,
		open: dummyAnalytics.summary.ticketsByStatus[TicketStatus.OPEN],
		inProgress: dummyAnalytics.summary.ticketsByStatus[TicketStatus.IN_PROGRESS],
		resolved: dummyAnalytics.summary.ticketsByStatus[TicketStatus.RESOLVED],
		blocked: dummyAnalytics.summary.ticketsByStatus[TicketStatus.BLOCKED],
	};

	return (
		<div className="p-4 md:p-6 space-y-6">
			{/* Stats Overview */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
						<Ticket className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{ticketStats.total}</div>
						<p className="text-xs text-muted-foreground mt-1">
							{dummyAnalytics.summary.ticketTrends.trend} from last week
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
						<AlertCircle className="h-4 w-4 text-yellow-500" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{ticketStats.open}</div>
						<p className="text-xs text-muted-foreground mt-1">
							{dummyAnalytics.summary.averageResponseTime} avg. response time
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
						<CheckCircle2 className="h-4 w-4 text-green-500" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{dummyAnalytics.summary.resolutionRate}
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							{ticketStats.resolved} tickets resolved
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium">Weekly Trend</CardTitle>
						<TrendingUp className="h-4 w-4 text-blue-500" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{dummyAnalytics.summary.ticketsThisWeek}
						</div>
						<p className="text-xs text-muted-foreground mt-1">New tickets this week</p>
					</CardContent>
				</Card>
			</div>

			{/* Recent Tickets and Analytics */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recent Tickets */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle>Recent Tickets</CardTitle>
						<Button variant="ghost" size="sm" onClick={() => navigate("/tickets/list")}>
							View All
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{recentTickets?.map((ticket) => (
								<div
									key={ticket.id}
									className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
									onClick={() => navigate(`/tickets/${ticket.id}`)}
								>
									<div className="space-y-1">
										<div className="flex items-center gap-2">
											<span className="font-medium">{ticket.subject}</span>
											<Badge variant="outline">{ticket.ticketNumber}</Badge>
										</div>
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<Badge
												variant="secondary"
												className={cn(
													statusColors[ticket.status as TicketStatus]
												)}
											>
												{ticket.status}
											</Badge>
											<Badge
												variant="secondary"
												className={cn(
													priorityColors[
														ticket.priority as TicketPriority
													]
												)}
											>
												{ticket.priority}
											</Badge>
										</div>
									</div>
									<div className="text-sm text-muted-foreground">
										{new Date(ticket.createdAt).toLocaleDateString()}
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Ticket Distribution */}
				<div className="grid grid-cols-1 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Status Distribution</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{Object.entries(dummyAnalytics.summary.ticketsByStatus).map(
									([status, count]) => (
										<div key={status} className="space-y-2">
											<div className="flex items-center justify-between text-sm">
												<span className="capitalize">
													{status.toLowerCase().replace(/_/g, " ")}
												</span>
												<span className="font-medium">{count}</span>
											</div>
											<div className="h-2 rounded-full bg-muted overflow-hidden">
												<div
													className={cn(
														"h-full rounded-full",
														statusColors[
															status as TicketStatus
														].replace("/10", "")
													)}
													style={{
														width: `${
															(count / ticketStats.total) * 100
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
							<CardTitle>Priority Distribution</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								{Object.entries(dummyAnalytics.summary.ticketsByPriority).map(
									([priority, count]) => (
										<div key={priority} className="space-y-2">
											<div className="flex items-center justify-between text-sm">
												<span className="capitalize">
													{priority.toLowerCase()}
												</span>
												<span className="font-medium">{count}</span>
											</div>
											<div className="h-2 rounded-full bg-muted overflow-hidden">
												<div
													className={cn(
														"h-full rounded-full",
														priorityColors[
															priority as TicketPriority
														].replace("/10", "")
													)}
													style={{
														width: `${
															(count / ticketStats.total) * 100
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
				</div>
			</div>
		</div>
	);
}
