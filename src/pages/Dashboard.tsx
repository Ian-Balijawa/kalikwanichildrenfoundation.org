import { useTickets } from "@/hooks/useTickets";
import { useEmail } from "@/hooks/useEmail";
import { useUsers } from "@/hooks/useUsers";
import { useClients } from "@/hooks/useClients";
import { useDemands } from "@/hooks/useDemands";
import { Card } from "@/components/ui/card";
import { clsx } from "clsx";
import {
	Ticket,
	Mail,
	Users,
	Building2,
	FileText,
	AlertCircle,
	CheckCircle2,
	Clock,
} from "lucide-react";
import { TicketStatus } from "@/types/enums";

export default function Dashboard() {
	const { tickets } = useTickets();
	const { users } = useUsers();
	const { clients } = useClients();
	const { demands } = useDemands({});
	const { useGetInbox } = useEmail();
	const { data: emails = [] } = useGetInbox(10);

	// Calculate ticket statistics
	const ticketStats = {
		total: tickets.length,
		open: tickets.filter((t) => t.status === TicketStatus.OPEN).length,
		inProgress: tickets.filter((t) => t.status === TicketStatus.IN_PROGRESS).length,
		resolved: tickets.filter((t) => t.status === TicketStatus.RESOLVED).length,
	};

	const overviewCards = [
		{
			title: "Total Tickets",
			value: ticketStats.total,
			icon: Ticket,
			stats: [
				{
					label: "Open",
					value: ticketStats.open,
					icon: AlertCircle,
					color: "text-yellow-500",
				},
				{
					label: "In Progress",
					value: ticketStats.inProgress,
					icon: Clock,
					color: "text-blue-500",
				},
				{
					label: "Resolved",
					value: ticketStats.resolved,
					icon: CheckCircle2,
					color: "text-green-500",
				},
			],
		},
		{
			title: "Active Demands",
			value: demands.length,
			icon: FileText,
			color: "text-purple-500",
		},
		{
			title: "Recent Emails",
			value: emails.length,
			icon: Mail,
			color: "text-blue-500",
		},
		{
			title: "Total Users",
			value: users.length,
			icon: Users,
			color: "text-green-500",
		},
		{
			title: "Active Clients",
			value: clients.filter((c) => c.isActive).length,
			icon: Building2,
			color: "text-orange-500",
		},
	];

	return (
		<div className="p-6 space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Dashboard</h1>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{overviewCards.map((card, index) => (
					<Card key={index} className="p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-muted-foreground">{card.title}</p>
								<h2 className="text-2xl font-bold mt-1">{card.value}</h2>
							</div>
							<card.icon className={clsx("h-8 w-8", card.color)} />
						</div>

						{card.stats && (
							<div className="mt-4 space-y-2">
								{card.stats.map((stat, idx) => (
									<div key={idx} className="flex items-center gap-2">
										<stat.icon className={clsx("h-4 w-4", stat.color)} />
										<span className="text-sm text-muted-foreground">
											{stat.label}:
										</span>
										<span className="text-sm font-medium">{stat.value}</span>
									</div>
								))}
							</div>
						)}
					</Card>
				))}
			</div>

			{/* Recent Activity Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card className="p-6">
					<h3 className="text-lg font-semibold mb-4">Recent Tickets</h3>
					<div className="space-y-4">
						{tickets.slice(0, 5).map((ticket) => (
							<div key={ticket.id} className="flex items-center gap-4">
								<div
									className={clsx(
										"w-2 h-2 rounded-full",
										ticket.status === TicketStatus.OPEN && "bg-yellow-500",
										ticket.status === TicketStatus.IN_PROGRESS && "bg-blue-500",
										ticket.status === TicketStatus.RESOLVED && "bg-green-500"
									)}
								/>
								<div className="flex-1">
									<p className="text-sm font-medium">{ticket.subject}</p>
									<p className="text-xs text-muted-foreground">
										{ticket.assignedTo?.firstname} {ticket.assignedTo?.lastname}
									</p>
								</div>
								<span className="text-xs text-muted-foreground">
									{new Date(ticket.createdAt).toLocaleDateString()}
								</span>
							</div>
						))}
					</div>
				</Card>

				<Card className="p-6">
					<h3 className="text-lg font-semibold mb-4">Recent Emails</h3>
					<div className="space-y-4">
						{emails.slice(0, 5).map((email) => (
							<div key={email.id} className="flex items-center gap-4">
								<Mail className="h-4 w-4 text-blue-500" />
								<div className="flex-1">
									<p className="text-sm font-medium">{email.snippet}</p>
									<p className="text-xs text-muted-foreground">
										{new Date(email.internalDate).toLocaleDateString()}
									</p>
								</div>
							</div>
						))}
					</div>
				</Card>
			</div>
		</div>
	);
}
