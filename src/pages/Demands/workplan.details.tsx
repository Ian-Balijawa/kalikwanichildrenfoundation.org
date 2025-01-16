import { useParams, useNavigate } from "react-router-dom";
import { useWorkPlan } from "@/hooks/useWorkPlan";
import { useTasks } from "@/hooks/useTasks";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, LayoutGrid, Kanban, List, Calendar, Timer } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { GanttTask } from "@/components/GanttChart";
import { TaskListView } from "./components/TaskListView";
import { TaskKanbanView } from "./components/TaskKanbanView";
import { TaskGanttView } from "./components/TaskGanttView";

export default function WorkPlanDetails() {
	const { demandId, workPlanId } = useParams<{ demandId: string; workPlanId: string }>();
	const navigate = useNavigate();
	const { workPlans } = useWorkPlan();
	const workPlan = workPlans.find((wp) => wp.id === Number(workPlanId));
	const { tasks, createTask, updateTaskStatus } = useTasks({ workPlanId: Number(workPlanId) });
	const [viewMode, setViewMode] = useState<"list" | "kanban" | "gantt">("list");
	const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);

	if (!workPlan) {
		return (
			<div className="p-6">
				<Card className="p-6 text-center">
					<h2 className="text-lg font-semibold">Work Plan not found</h2>
					<p className="text-muted-foreground mt-2">
						The work plan you're looking for doesn't exist or has been deleted.
					</p>
					<Button className="mt-4" onClick={() => navigate(`/demands/${demandId}`)}>
						Back to Demand
					</Button>
				</Card>
			</div>
		);
	}

	const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		try {
			await createTask({
				title: formData.get("title") as string,
				description: formData.get("description") as string,
				workPlanId: Number(workPlanId),
				deadline: formData.get("deadline") as string,
				assignedToId: Number(formData.get("assignedTo")),
				storyPoints: Number(formData.get("storyPoints")),
				status: "NOT_STARTED",
				progress: 0,
			});
			setIsTaskDialogOpen(false);
			toast.success("Task created successfully");
		} catch (error) {
			toast.error("Failed to create task");
		}
	};

	const handleStatusChange = async (taskId: number, newStatus: string) => {
		try {
			await updateTaskStatus({ taskId, status: newStatus });
			toast.success("Task status updated successfully");
		} catch (error) {
			toast.error("Failed to update task status");
		}
	};

	const handleTaskUpdate = async (taskId: number, changes: Partial<GanttTask>) => {
		try {
			// TODO: Implement actual task update logic
			// For now, we'll just show a success message
			toast.success("Task updated successfully");
			return Promise.resolve();
		} catch (error) {
			toast.error("Failed to update task");
			return Promise.reject(error);
		}
	};

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => navigate(`/demands/${demandId}`)}
						className="rounded-full"
					>
						<ArrowLeft className="h-4 w-4" />
					</Button>
					<div>
						<h1 className="text-2xl font-bold">{workPlan.workPlanTitle}</h1>
						<p className="text-sm text-muted-foreground">{workPlan.description}</p>
					</div>
				</div>
				<Button onClick={() => setIsTaskDialogOpen(true)}>
					<Plus className="h-4 w-4 mr-2" />
					Add Task
				</Button>
			</div>

			{/* Work Plan Info */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card className="p-4">
					<div className="flex items-center gap-2">
						<Calendar className="h-4 w-4 text-muted-foreground" />
						<div>
							<p className="text-sm font-medium">Start Date</p>
							<p className="text-sm text-muted-foreground">
								{format(new Date(workPlan.plannedStartDate), "MMM d, yyyy")}
							</p>
						</div>
					</div>
				</Card>
				<Card className="p-4">
					<div className="flex items-center gap-2">
						<Calendar className="h-4 w-4 text-muted-foreground" />
						<div>
							<p className="text-sm font-medium">End Date</p>
							<p className="text-sm text-muted-foreground">
								{format(new Date(workPlan.plannedEndDate), "MMM d, yyyy")}
							</p>
						</div>
					</div>
				</Card>
				<Card className="p-4">
					<div className="flex items-center gap-2">
						<Timer className="h-4 w-4 text-muted-foreground" />
						<div>
							<p className="text-sm font-medium">Deadline</p>
							<p className="text-sm text-muted-foreground">
								{format(new Date(workPlan.submissionDeadline), "MMM d, yyyy")}
							</p>
						</div>
					</div>
				</Card>
			</div>

			{/* Tasks Views */}
			<Card className="p-6">
				<Tabs
					value={viewMode}
					onValueChange={(value) => setViewMode(value as typeof viewMode)}
				>
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-lg font-semibold">Tasks</h2>
						<TabsList>
							<TabsTrigger value="list">
								<List className="h-4 w-4 mr-2" />
								List
							</TabsTrigger>
							<TabsTrigger value="kanban">
								<Kanban className="h-4 w-4 mr-2" />
								Kanban
							</TabsTrigger>
							<TabsTrigger value="gantt">
								<LayoutGrid className="h-4 w-4 mr-2" />
								Gantt
							</TabsTrigger>
						</TabsList>
					</div>

					<TabsContent value="list">
						<TaskListView tasks={tasks} />
					</TabsContent>

					<TabsContent value="kanban">
						<TaskKanbanView tasks={tasks} onStatusChange={handleStatusChange} />
					</TabsContent>

					<TabsContent value="gantt">
						<TaskGanttView tasks={tasks} onTaskUpdate={handleTaskUpdate} />
					</TabsContent>
				</Tabs>
			</Card>

			{/* Task Dialog */}
			<Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create New Task</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleCreateTask} className="space-y-4">
						<div>
							<Input name="title" placeholder="Task Title" required />
						</div>
						<div>
							<Textarea name="description" placeholder="Task Description" required />
						</div>
						<div>
							<Input name="deadline" type="date" required />
						</div>
						<div>
							<Input
								name="assignedTo"
								type="number"
								placeholder="Assigned To (User ID)"
								required
							/>
						</div>
						<div>
							<Input
								name="storyPoints"
								type="number"
								placeholder="Story Points"
								required
							/>
						</div>
						<div className="flex justify-end">
							<Button type="submit">Create Task</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
