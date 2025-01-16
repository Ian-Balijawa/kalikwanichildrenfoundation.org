import { useEffect, useRef } from "react";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { gantt } from "dhtmlx-gantt";

export interface GanttTask {
	id: number;
	text: string;
	start_date: Date;
	end_date: Date;
	progress: number;
	assignedTo?: {
		firstname: string;
		lastname: string;
	};
	description?: string;
	status?: string;
}

interface GanttChartProps {
	tasks: GanttTask[];
	onTaskUpdate?: (id: number, changes: Partial<GanttTask>) => void;
}

export function GanttChart({ tasks, onTaskUpdate }: GanttChartProps) {
	const ganttContainer = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ganttContainer.current) return;

		gantt.config.date_format = "%Y-%m-%d";
		gantt.config.drag_progress = false;
		gantt.config.drag_resize = false;
		gantt.config.drag_move = false;

		// Configure columns in the grid
		gantt.config.columns = [
			{ name: "text", label: "Task", tree: true, width: "*" },
			{ name: "start_date", label: "Start Date", align: "center", width: 100 },
			{ name: "duration", label: "Duration", align: "center", width: 80 },
			{
				name: "assigned",
				label: "Assigned To",
				align: "center",
				width: 130,
				template: (task: GanttTask) => {
					if (task.assignedTo) {
						return `${task.assignedTo.firstname} ${task.assignedTo.lastname}`;
					}
					return "";
				},
			},
			{
				name: "progress",
				label: "Progress",
				align: "center",
				width: 80,
				template: (task: GanttTask) => {
					return `${Math.round(task.progress * 100)}%`;
				},
			},
		];

		// Configure task properties
		gantt.templates.progress_text = (start: Date, end: Date, task: GanttTask) => {
			return `${Math.round(task.progress * 100)}%`;
		};

		// Set working hours
		gantt.config.work_time = true;
		gantt.config.skip_off_time = true;

		// Initialize gantt
		gantt.init(ganttContainer.current);

		// Load data
		gantt.clearAll();
		gantt.parse({ data: tasks });

		// Event handlers
		if (onTaskUpdate) {
			gantt.attachEvent("onAfterTaskUpdate", (id: number, item: GanttTask) => {
				onTaskUpdate(id, {
					start_date: item.start_date,
					end_date: item.end_date,
					progress: item.progress,
				});
			});
		}

		return () => {
			gantt.clearAll();
			gantt.detachAllEvents();
		};
	}, [tasks, onTaskUpdate]);

	return (
		<div
			ref={ganttContainer}
			style={{ width: "100%", height: "100%" }}
			className="gantt-chart"
		/>
	);
}
