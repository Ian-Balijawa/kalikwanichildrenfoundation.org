import { useTickets } from "@/hooks/useTickets";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { TicketStatus, TicketPriority } from "@/types/enums";
import { cn } from "@/lib/utils";
import { type ColumnDef } from "@tanstack/react-table";
import { type Ticket } from "@/types";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const statusColors: Record<TicketStatus, string> = {
	[TicketStatus.OPEN]: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
	[TicketStatus.IN_PROGRESS]: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
	[TicketStatus.RESOLVED]: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
	[TicketStatus.CLOSED]: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
	[TicketStatus.BLOCKED]: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
};

const priorityColors: Record<TicketPriority, string> = {
	[TicketPriority.LOW]: "bg-gray-500/10 text-gray-500",
	[TicketPriority.MEDIUM]: "bg-blue-500/10 text-blue-500",
	[TicketPriority.HIGH]: "bg-orange-500/10 text-orange-500",
	[TicketPriority.URGENT]: "bg-red-500/10 text-red-500",
};

const columns: ColumnDef<Ticket>[] = [
	{
		accessorKey: "ticketNumber",
		header: "Ticket Number",
		cell: ({ row }) => (
			<Link
				to={`/tickets/${row.original.id}`}
				className="font-medium text-primary hover:underline"
			>
				{row.getValue("ticketNumber")}
			</Link>
		),
	},
	{
		accessorKey: "subject",
		header: "Subject",
		cell: ({ row }) => (
			<Link to={`/tickets/${row.original.id}`} className="text-foreground hover:underline">
				{row.getValue("subject")}
			</Link>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as TicketStatus;
			return (
				<Badge variant="secondary" className={cn("font-normal", statusColors[status])}>
					{status}
				</Badge>
			);
		},
	},
	{
		accessorKey: "priority",
		header: "Priority",
		cell: ({ row }) => {
			const priority = row.getValue("priority") as TicketPriority;
			return (
				<Badge variant="secondary" className={cn("font-normal", priorityColors[priority])}>
					{priority}
				</Badge>
			);
		},
	},
	{
		accessorKey: "assignedTo",
		header: "Assigned To",
		cell: ({ row }) => {
			const assignedTo = row.getValue("assignedTo") as Ticket["assignedTo"];
			if (!assignedTo) return <span className="text-muted-foreground">Unassigned</span>;

			return (
				<div className="flex items-center gap-2">
					<div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
						<span className="text-xs">
							{assignedTo.firstname[0]}
							{assignedTo.lastname[0]}
						</span>
					</div>
					<span>
						{assignedTo.firstname} {assignedTo.lastname}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: "Created",
		cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
	},
];

export default function TicketsList() {
	const { tickets, isLoading } = useTickets();
	const [searchQuery, setSearchQuery] = useState("");

	const filteredTickets = tickets.filter((ticket) => {
		const searchContent = [
			ticket.ticketNumber,
			ticket.subject,
			ticket.status,
			ticket.priority,
			ticket.assignedTo?.firstname,
			ticket.assignedTo?.lastname,
		]
			.filter(Boolean)
			.join(" ")
			.toLowerCase();

		return searchContent.includes(searchQuery.toLowerCase());
	});

	return (
		<div className="p-6 space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">Tickets</h1>
					<p className="text-muted-foreground">Manage and track all support tickets</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm">
						<Filter className="h-4 w-4 mr-2" />
						Filter
					</Button>
					<Button asChild>
						<Link to="/tickets/new">
							<PlusCircle className="h-4 w-4 mr-2" />
							New Ticket
						</Link>
					</Button>
				</div>
			</div>

			<div className="flex items-center gap-2">
				<Input
					placeholder="Search tickets..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="max-w-sm"
				/>
			</div>

			<DataTable
				columns={columns}
				data={filteredTickets}
				isLoading={isLoading}
				enableSelection
			/>
		</div>
	);
}
