import { Card } from "@/components/ui/card";
import { Task } from "@/hooks/useTasks";
import { User2 } from "lucide-react";

interface TaskListViewProps {
	tasks: Task[];
}

export function TaskListView({ tasks }: TaskListViewProps) {
	return (
		<div className="space-y-4">
			{/* Not Started */}
			<div className="space-y-2">
				<h4 className="font-medium">Not Started</h4>
				<div className="border rounded-lg p-2 min-h-[200px]">
					{tasks
						.filter((task) => task.status === "NOT_STARTED")
						.map((task) => (
							<Card key={task.id} className="p-2 mb-2">
								<p className="font-medium">{task.title}</p>
								<p className="text-sm text-muted-foreground">{task.description}</p>
								{task.assignedTo && (
									<div className="flex items-center gap-2 mt-2">
										<User2 className="h-3 w-3" />
										<span className="text-xs">
											{task.assignedTo.firstname} {task.assignedTo.lastname}
										</span>
									</div>
								)}
							</Card>
						))}
				</div>
			</div>

			{/* In Progress */}
			<div className="space-y-2">
				<h4 className="font-medium">In Progress</h4>
				<div className="border rounded-lg p-2 min-h-[200px]">
					{tasks
						.filter((task) => task.status === "IN_PROGRESS")
						.map((task) => (
							<Card key={task.id} className="p-2 mb-2">
								<p className="font-medium">{task.title}</p>
								<p className="text-sm text-muted-foreground">{task.description}</p>
								{task.assignedTo && (
									<div className="flex items-center gap-2 mt-2">
										<User2 className="h-3 w-3" />
										<span className="text-xs">
											{task.assignedTo.firstname} {task.assignedTo.lastname}
										</span>
									</div>
								)}
							</Card>
						))}
				</div>
			</div>

			{/* Completed */}
			<div className="space-y-2">
				<h4 className="font-medium">Completed</h4>
				<div className="border rounded-lg p-2 min-h-[200px]">
					{tasks
						.filter((task) => task.status === "COMPLETED")
						.map((task) => (
							<Card key={task.id} className="p-2 mb-2">
								<p className="font-medium">{task.title}</p>
								<p className="text-sm text-muted-foreground">{task.description}</p>
								{task.assignedTo && (
									<div className="flex items-center gap-2 mt-2">
										<User2 className="h-3 w-3" />
										<span className="text-xs">
											{task.assignedTo.firstname} {task.assignedTo.lastname}
										</span>
									</div>
								)}
							</Card>
						))}
				</div>
			</div>
		</div>
	);
}
