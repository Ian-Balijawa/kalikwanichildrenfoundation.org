import { GanttChart, GanttTask } from "@/components/GanttChart";
import { Task } from "@/hooks/useTasks";

interface TaskGanttViewProps {
	tasks: Task[];
	onTaskUpdate?: (taskId: number, changes: Partial<GanttTask>) => Promise<void>;
}

export function TaskGanttView({ tasks, onTaskUpdate }: TaskGanttViewProps) {
	const transformedTasks: GanttTask[] = tasks.map((task) => ({
		id: Number(task.id),
		text: task.title,
		start_date: new Date(task.startDate),
		end_date: new Date(task.endDate),
		progress: task.progress / 100,
		assignedTo: task.assignedTo
			? {
					firstname: task.assignedTo.firstname,
					lastname: task.assignedTo.lastname,
			  }
			: undefined,
		description: task.description,
		status: task.status,
	}));

	return (
		<div className="h-[600px] border rounded-lg">
			<GanttChart
				tasks={transformedTasks}
				onTaskUpdate={async (id, changes) => {
					if (onTaskUpdate) {
						await onTaskUpdate(id, changes);
					}
				}}
			/>
		</div>
	);
}
