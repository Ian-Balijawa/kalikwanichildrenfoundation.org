import { useTickets } from "@/hooks/useTickets";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	PlusCircle,
	Filter,
	GripVertical,
	LayoutGrid,
	SortAsc,
	SortDesc,
	Users,
	Signal,
} from "lucide-react";
import { Link } from "react-router-dom";
import { TicketStatus, TicketPriority, type Ticket } from "@/types/api";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const statusColors: Record<TicketStatus, string> = {
	[TicketStatus.OPEN]: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
	[TicketStatus.IN_PROGRESS]: "bg-blue-500/10 text-blue-500 border-blue-500/20",
	[TicketStatus.RESOLVED]: "bg-green-500/10 text-green-500 border-green-500/20",
	[TicketStatus.CLOSED]: "bg-gray-500/10 text-gray-500 border-gray-500/20",
	[TicketStatus.BLOCKED]: "bg-red-500/10 text-red-500 border-red-500/20",
};

const priorityColors: Record<TicketPriority, string> = {
	[TicketPriority.LOW]: "bg-gray-500/10 text-gray-500",
	[TicketPriority.MEDIUM]: "bg-blue-500/10 text-blue-500",
	[TicketPriority.HIGH]: "bg-orange-500/10 text-orange-500",
	[TicketPriority.URGENT]: "bg-red-500/10 text-red-500",
};

const columns = [
	{ id: TicketStatus.OPEN, title: "Open" },
	{ id: TicketStatus.IN_PROGRESS, title: "In Progress" },
	{ id: TicketStatus.BLOCKED, title: "Blocked" },
	{ id: TicketStatus.RESOLVED, title: "Resolved" },
	{ id: TicketStatus.CLOSED, title: "Closed" },
];

type SortField = "createdAt" | "priority" | "assignedTo";
type SortDirection = "asc" | "desc";
type ViewMode = "compact" | "detailed";
type GroupBy = "none" | "priority" | "assignee";

export default function TicketsKanban() {
	const { tickets, isLoading, updateTicketStatus } = useTickets();
	const [searchQuery, setSearchQuery] = useState("");
	const [sortField, setSortField] = useState<SortField>("createdAt");
	const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
	const [viewMode, setViewMode] = useState<ViewMode>("detailed");
	const [groupBy, setGroupBy] = useState<GroupBy>("none");
	const [selectedPriorities, setSelectedPriorities] = useState<TicketPriority[]>(
		Object.values(TicketPriority)
	);

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

		return (
			searchContent.includes(searchQuery.toLowerCase()) &&
			selectedPriorities.includes(ticket.priority)
		);
	});

	const sortedTickets = [...filteredTickets].sort((a, b) => {
		if (sortField === "createdAt") {
			return sortDirection === "asc"
				? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
				: new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		}
		if (sortField === "priority") {
			const priorityOrder = {
				[TicketPriority.URGENT]: 0,
				[TicketPriority.HIGH]: 1,
				[TicketPriority.MEDIUM]: 2,
				[TicketPriority.LOW]: 3,
			};
			return sortDirection === "asc"
				? priorityOrder[a.priority] - priorityOrder[b.priority]
				: priorityOrder[b.priority] - priorityOrder[a.priority];
		}
		if (sortField === "assignedTo") {
			const aName = a.assignedTo ? `${a.assignedTo.firstname} ${a.assignedTo.lastname}` : "";
			const bName = b.assignedTo ? `${b.assignedTo.firstname} ${b.assignedTo.lastname}` : "";
			return sortDirection === "asc"
				? aName.localeCompare(bName)
				: bName.localeCompare(aName);
		}
		return 0;
	});

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const { draggableId, destination } = result;
		const newStatus = destination.droppableId as TicketStatus;

		try {
			updateTicketStatus({
				id: draggableId,
				status: newStatus,
			});
		} catch (error) {
			console.error("Failed to update ticket status:", error);
		}
	};

	const getGroupedTickets = (tickets: Ticket[]) => {
		if (groupBy === "none") return { none: tickets };

		return tickets.reduce((groups, ticket) => {
			const key =
				groupBy === "priority"
					? ticket.priority
					: ticket.assignedTo
					? `${ticket.assignedTo.firstname} ${ticket.assignedTo.lastname}`
					: "Unassigned";

			return {
				...groups,
				[key]: [...(groups[key] || []), ticket],
			};
		}, {} as Record<string, Ticket[]>);
	};

	const groupedTickets = getGroupedTickets(sortedTickets);

	return (
		<div className="p-6 space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">Tickets Board</h1>
					<p className="text-muted-foreground">Manage tickets using drag and drop</p>
				</div>
				<div className="flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm">
								<Filter className="h-4 w-4 mr-2" />
								Filter
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuLabel>Priority</DropdownMenuLabel>
							{Object.values(TicketPriority).map((priority) => (
								<DropdownMenuItem
									key={priority}
									onSelect={() => {
										setSelectedPriorities((prev) =>
											prev.includes(priority)
												? prev.filter((p) => p !== priority)
												: [...prev, priority]
										);
									}}
								>
									<div
										className={cn(
											"h-4 w-4 mr-2 rounded-sm border",
											selectedPriorities.includes(priority)
												? "bg-primary"
												: "bg-transparent"
										)}
									/>
									{priority}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>

					<Select
						value={sortField}
						onValueChange={(value) => setSortField(value as SortField)}
					>
						<SelectTrigger className="w-[130px]">
							<SelectValue placeholder="Sort by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="createdAt">Created Date</SelectItem>
							<SelectItem value="priority">Priority</SelectItem>
							<SelectItem value="assignedTo">Assignee</SelectItem>
						</SelectContent>
					</Select>

					<Button
						variant="outline"
						size="icon"
						onClick={() =>
							setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
						}
					>
						{sortDirection === "asc" ? (
							<SortAsc className="h-4 w-4" />
						) : (
							<SortDesc className="h-4 w-4" />
						)}
					</Button>

					<Select value={groupBy} onValueChange={(value) => setGroupBy(value as GroupBy)}>
						<SelectTrigger className="w-[130px]">
							<SelectValue placeholder="Group by" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="none">No Grouping</SelectItem>
							<SelectItem value="priority">Priority</SelectItem>
							<SelectItem value="assignee">Assignee</SelectItem>
						</SelectContent>
					</Select>

					<Button
						variant="outline"
						size="icon"
						onClick={() =>
							setViewMode((prev) => (prev === "compact" ? "detailed" : "compact"))
						}
					>
						<LayoutGrid className="h-4 w-4" />
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

			<DragDropContext onDragEnd={handleDragEnd}>
				<div className="grid grid-cols-5 gap-4">
					{columns.map((column) => (
						<div
							key={column.id}
							className={cn(
								"flex flex-col rounded-lg border",
								statusColors[column.id]
							)}
						>
							<div className="flex items-center justify-between p-4 border-b">
								<h3 className="font-semibold">{column.title}</h3>
								<Badge variant="secondary" className="font-mono text-xs">
									{
										sortedTickets.filter(
											(ticket) => ticket.status === column.id
										).length
									}
								</Badge>
							</div>

							{Object.entries(groupedTickets).map(([group, groupTickets]) => (
								<div key={group} className="flex-1">
									{groupBy !== "none" && (
										<div className="px-4 py-2 bg-muted/50 border-y text-sm font-medium flex items-center gap-2">
											{groupBy === "priority" ? (
												<Signal className="h-4 w-4" />
											) : (
												<Users className="h-4 w-4" />
											)}
											{group}
										</div>
									)}
									<Droppable droppableId={column.id}>
										{(provided) => (
											<div
												ref={provided.innerRef}
												{...provided.droppableProps}
												className="flex-1 p-2 space-y-2 min-h-[100px]"
											>
												{groupTickets
													.filter((ticket) => ticket.status === column.id)
													.map((ticket, index) => (
														<Draggable
															key={ticket.id}
															draggableId={ticket.id}
															index={index}
														>
															{(provided) => (
																<div
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	className={cn(
																		"rounded-md border bg-background p-3",
																		viewMode === "detailed"
																			? "space-y-3"
																			: "space-y-1"
																	)}
																>
																	<div className="flex items-start justify-between gap-2">
																		<Link
																			to={`/tickets/${ticket.id}`}
																			className="flex-1"
																		>
																			<h4 className="text-sm font-medium leading-none hover:underline">
																				{ticket.subject}
																			</h4>
																			{viewMode ===
																				"detailed" && (
																				<p className="text-xs text-muted-foreground mt-1">
																					{
																						ticket.ticketNumber
																					}
																				</p>
																			)}
																		</Link>
																		<div
																			{...provided.dragHandleProps}
																			className="h-4 w-4 flex items-center justify-center text-muted-foreground"
																		>
																			<GripVertical className="h-4 w-4" />
																		</div>
																	</div>
																	{viewMode === "detailed" && (
																		<div className="flex items-center justify-between gap-2">
																			<Badge
																				variant="secondary"
																				className={cn(
																					"font-normal",
																					priorityColors[
																						ticket
																							.priority
																					]
																				)}
																			>
																				{ticket.priority}
																			</Badge>
																			{ticket.assignedTo && (
																				<div className="flex items-center gap-1">
																					<div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
																						<span className="text-xs">
																							{
																								ticket
																									.assignedTo
																									.firstname[0]
																							}
																							{
																								ticket
																									.assignedTo
																									.lastname[0]
																							}
																						</span>
																					</div>
																				</div>
																			)}
																		</div>
																	)}
																</div>
															)}
														</Draggable>
													))}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
								</div>
							))}
						</div>
					))}
				</div>
			</DragDropContext>
		</div>
	);
}
