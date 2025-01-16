import { Task } from "@/hooks/useTasks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GripVertical, LayoutGrid, SortAsc, SortDesc, User2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const statusColors: Record<string, string> = {
	NOT_STARTED: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
	IN_PROGRESS: "bg-blue-500/10 text-blue-500 border-blue-500/20",
	COMPLETED: "bg-green-500/10 text-green-500 border-green-500/20",
};

const columns = [
	{ id: "NOT_STARTED", title: "Not Started" },
	{ id: "IN_PROGRESS", title: "In Progress" },
	{ id: "COMPLETED", title: "Completed" },
];

type SortField = "startDate" | "endDate" | "storyPoints" | "assignedTo";
type SortDirection = "asc" | "desc";
type ViewMode = "compact" | "detailed";
type GroupBy = "none" | "storyPoints" | "assignee";

interface TaskKanbanViewProps {
	tasks: Task[];
	onStatusChange?: (taskId: number, newStatus: string) => Promise<void>;
}

export function TaskKanbanView({ tasks, onStatusChange }: TaskKanbanViewProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [sortField, setSortField] = useState<SortField>("startDate");
	const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
	const [viewMode, setViewMode] = useState<ViewMode>("detailed");
	const [groupBy, setGroupBy] = useState<GroupBy>("none");

	const filteredTasks = tasks.filter((task) => {
		const searchContent = [
			task.title,
			task.description,
			task.status,
			task.assignedTo?.firstname,
			task.assignedTo?.lastname,
		]
			.filter(Boolean)
			.join(" ")
			.toLowerCase();

		return searchContent.includes(searchQuery.toLowerCase());
	});

	const sortedTasks = [...filteredTasks].sort((a, b) => {
		if (sortField === "startDate") {
			return sortDirection === "asc"
				? new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
				: new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
		}
		if (sortField === "endDate") {
			return sortDirection === "asc"
				? new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
				: new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
		}
		if (sortField === "storyPoints") {
			return sortDirection === "asc"
				? a.storyPoints - b.storyPoints
				: b.storyPoints - a.storyPoints;
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

	const handleDragEnd = async (result: DropResult) => {
		if (!result.destination || !onStatusChange) return;

		const { draggableId, destination } = result;
		const newStatus = destination.droppableId;

		try {
			await onStatusChange(Number(draggableId), newStatus);
		} catch (error) {
			console.error("Failed to update task status:", error);
		}
	};

	const getGroupedTasks = (tasks: Task[]) => {
		if (groupBy === "none") return { none: tasks };

		return tasks.reduce((groups, task) => {
			const key =
				groupBy === "storyPoints"
					? task.storyPoints.toString()
					: task.assignedTo
					? `${task.assignedTo.firstname} ${task.assignedTo.lastname}`
					: "Unassigned";

			return {
				...groups,
				[key]: [...(groups[key] || []), task],
			};
		}, {} as Record<string, Task[]>);
	};

	const groupedTasks = getGroupedTasks(sortedTasks);

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-4">
				<Input
					placeholder="Search tasks..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="max-w-xs"
				/>
				<Select
					value={sortField}
					onValueChange={(value) => setSortField(value as SortField)}
				>
					<SelectTrigger className="w-[130px]">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="startDate">Start Date</SelectItem>
						<SelectItem value="endDate">End Date</SelectItem>
						<SelectItem value="storyPoints">Story Points</SelectItem>
						<SelectItem value="assignedTo">Assignee</SelectItem>
					</SelectContent>
				</Select>

				<Button
					variant="outline"
					size="icon"
					onClick={() => setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))}
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
						<SelectItem value="storyPoints">Story Points</SelectItem>
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
			</div>

			<DragDropContext onDragEnd={handleDragEnd}>
				<div className="grid grid-cols-3 gap-4">
					{columns.map((column) => (
						<Droppable key={column.id} droppableId={column.id}>
							{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className="space-y-2"
								>
									<div className="flex items-center justify-between">
										<h4 className="font-medium">{column.title}</h4>
										<Badge variant="secondary">
											{
												filteredTasks.filter(
													(task) => task.status === column.id
												).length
											}
										</Badge>
									</div>
									<div className="border rounded-lg p-2 min-h-[600px]">
										{Object.entries(groupedTasks).map(([group, tasks]) => (
											<div key={group}>
												{groupBy !== "none" && (
													<div className="px-2 py-1 text-sm font-medium text-muted-foreground">
														{group}
													</div>
												)}
												{tasks
													.filter((task) => task.status === column.id)
													.map((task, index) => (
														<Draggable
															key={task.id}
															draggableId={task.id.toString()}
															index={index}
														>
															{(provided) => (
																<Card
																	ref={provided.innerRef}
																	{...provided.draggableProps}
																	className={cn(
																		"p-3 mb-2",
																		viewMode === "compact" &&
																			"p-2"
																	)}
																>
																	<div
																		{...provided.dragHandleProps}
																		className="flex items-center gap-2 mb-2"
																	>
																		<GripVertical className="h-4 w-4 text-muted-foreground" />
																		<Badge
																			variant="secondary"
																			className={cn(
																				statusColors[
																					task.status
																				]
																			)}
																		>
																			{task.status}
																		</Badge>
																	</div>
																	<p className="font-medium">
																		{task.title}
																	</p>
																	{viewMode === "detailed" && (
																		<p className="text-sm text-muted-foreground mt-1">
																			{task.description}
																		</p>
																	)}
																	<div className="flex items-center gap-4 mt-2">
																		{task.assignedTo && (
																			<div className="flex items-center gap-2">
																				<User2 className="h-3 w-3" />
																				<span className="text-xs">
																					{
																						task
																							.assignedTo
																							.firstname
																					}{" "}
																					{
																						task
																							.assignedTo
																							.lastname
																					}
																				</span>
																			</div>
																		)}
																		<Badge variant="outline">
																			{task.storyPoints} pts
																		</Badge>
																		<Badge
																			variant="secondary"
																			className="ml-auto"
																		>
																			{task.progress}%
																		</Badge>
																	</div>
																</Card>
															)}
														</Draggable>
													))}
											</div>
										))}
										{provided.placeholder}
									</div>
								</div>
							)}
						</Droppable>
					))}
				</div>
			</DragDropContext>
		</div>
	);
}
