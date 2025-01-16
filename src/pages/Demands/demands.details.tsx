import { useDemands } from "@/hooks/useDemands";
import { useWorkPlan } from "@/hooks/useWorkPlan";
import { useTasks } from "@/hooks/useTasks";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { DemandStatus } from "@/types/enums";
import { cn } from "@/lib/utils";
import { ArrowLeft, Calendar, FileText, MoreVertical, Upload, Users, Plus } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import { format } from "date-fns";

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

export default function DemandsDetails() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { demands, isLoading, documents, updateDemand, uploadDemandDocument } = useDemands({
		id: Number(id),
	});
	const { workPlans, createWorkPlan } = useWorkPlan();
	const [selectedWorkPlan, setSelectedWorkPlan] = useState<number | null>(null);
	const { tasks, createTask } = useTasks({ workPlanId: selectedWorkPlan || 0 });
	const [isWorkPlanDialogOpen, setIsWorkPlanDialogOpen] = useState(false);
	const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
	const [viewMode, setViewMode] = useState<"gantt" | "kanban">("gantt");

	const demand = demands.find((d) => d.id === Number(id));

	if (isLoading) {
		return (
			<div className="p-6 space-y-6">
				<div className="flex items-center gap-4">
					<Skeleton className="h-10 w-10" />
					<Skeleton className="h-8 w-48" />
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div className="lg:col-span-2 space-y-6">
						<Skeleton className="h-[200px]" />
						<Skeleton className="h-[300px]" />
					</div>
					<div className="space-y-6">
						<Skeleton className="h-[200px]" />
						<Skeleton className="h-[200px]" />
					</div>
				</div>
			</div>
		);
	}

	if (!demand) {
		return (
			<div className="p-6">
				<Card className="p-6 text-center">
					<h2 className="text-lg font-semibold">Demand not found</h2>
					<p className="text-muted-foreground mt-2">
						The demand you're looking for doesn't exist or has been deleted.
					</p>
					<Button className="mt-4" onClick={() => navigate("/demands")}>
						Back to Demands
					</Button>
				</Card>
			</div>
		);
	}

	const handleStatusChange = async (newStatus: DemandStatus) => {
		try {
			await updateDemand({ id: Number(id), data: { status: newStatus } });
			toast.success("Demand status updated successfully");
		} catch (error) {
			toast.error("Failed to update demand status");
		}
	};

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);

		try {
			await uploadDemandDocument({ id: Number(id), data: formData });
			toast.success("Document uploaded successfully");
		} catch (error) {
			toast.error("Failed to upload document");
		}
	};

	const handleCreateWorkPlan = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		try {
			await createWorkPlan({
				workPlanTitle: formData.get("title") as string,
				description: formData.get("description") as string,
				plannedStartDate: formData.get("startDate") as string,
				plannedEndDate: formData.get("endDate") as string,
				submissionDeadline: formData.get("deadline") as string,
				demand: { id: Number(id) },
			});
			setIsWorkPlanDialogOpen(false);
			toast.success("Work plan created successfully");
		} catch (error) {
			toast.error("Failed to create work plan");
		}
	};

	const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		if (!selectedWorkPlan) {
			toast.error("Please select a work plan first");
			return;
		}

		try {
			await createTask({
				title: formData.get("title") as string,
				description: formData.get("description") as string,
				workPlanId: selectedWorkPlan,
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

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => navigate("/demands")}
						className="rounded-full"
					>
						<ArrowLeft className="h-4 w-4" />
					</Button>
					<div>
						<div className="flex items-center gap-2">
							<h1 className="text-2xl font-bold">{demand.title}</h1>
							<Badge
								variant="secondary"
								className={cn(statusColors[demand.status as DemandStatus])}
							>
								{demand.status}
							</Badge>
						</div>
						<p className="text-sm text-muted-foreground">
							{demand.client.name} • {demand.departmentName}
						</p>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon">
							<MoreVertical className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{Object.values(DemandStatus).map((status) => (
							<DropdownMenuItem
								key={status}
								onClick={() => handleStatusChange(status)}
								disabled={status === demand.status}
							>
								Change Status to {status}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* Main Content */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Left Column */}
				<div className="lg:col-span-2 space-y-6">
					{/* Summary */}
					<Card className="p-6">
						<h2 className="text-lg font-semibold mb-4">Summary</h2>
						<p className="text-sm text-muted-foreground">{demand.demandSummary}</p>
					</Card>

					{/* Description */}
					<Card className="p-6">
						<h2 className="text-lg font-semibold mb-4">Description</h2>
						<div className="prose prose-sm max-w-none">{demand.description}</div>
					</Card>

					{/* Documents */}
					<Card className="p-6">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-lg font-semibold">Documents</h2>
							<div className="flex items-center gap-2">
								<input
									type="file"
									id="file-upload"
									className="hidden"
									onChange={handleFileUpload}
								/>
								<Button asChild>
									<label htmlFor="file-upload" className="cursor-pointer">
										<Upload className="h-4 w-4 mr-2" />
										Upload Document
									</label>
								</Button>
							</div>
						</div>
						<div className="space-y-4">
							{documents.map((doc) => (
								<div
									key={doc.id}
									className="flex items-center justify-between p-4 border rounded-lg"
								>
									<div className="flex items-center gap-3">
										<FileText className="h-4 w-4 text-muted-foreground" />
										<div>
											<p className="font-medium">{doc.name}</p>
											<p className="text-sm text-muted-foreground">
												{doc.documentType}
											</p>
										</div>
									</div>
									<Badge variant="secondary">{doc.status}</Badge>
								</div>
							))}
							{documents.length === 0 && (
								<p className="text-sm text-muted-foreground text-center py-4">
									No documents uploaded yet
								</p>
							)}
						</div>
					</Card>

					{/* Work Plans Section */}
					<Card className="p-6">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-lg font-semibold">Work Plans</h2>
							<Button onClick={() => setIsWorkPlanDialogOpen(true)}>
								<Plus className="h-4 w-4 mr-2" />
								Create Work Plan
							</Button>
						</div>

						<div className="space-y-4">
							{workPlans.map((workPlan) => (
								<div key={workPlan.id} className="border rounded-lg p-4">
									<div className="flex items-center justify-between">
										<div>
											<h3 className="font-medium">
												{workPlan.workPlanTitle}
											</h3>
											<p className="text-sm text-muted-foreground">
												{workPlan.description}
											</p>
											<div className="flex items-center gap-4 mt-2">
												<div className="flex items-center gap-2">
													<Calendar className="h-4 w-4 text-muted-foreground" />
													<span className="text-sm">
														{format(
															new Date(workPlan.plannedStartDate),
															"MMM d"
														)}{" "}
														-{" "}
														{format(
															new Date(workPlan.plannedEndDate),
															"MMM d, yyyy"
														)}
													</span>
												</div>
											</div>
										</div>
										<Button
											variant="outline"
											onClick={() =>
												navigate(`/demands/${id}/workplans/${workPlan.id}`)
											}
										>
											View Details
										</Button>
									</div>
								</div>
							))}
							{workPlans.length === 0 && (
								<p className="text-center text-muted-foreground py-8">
									No work plans created yet
								</p>
							)}
						</div>
					</Card>
				</div>

				{/* Right Column */}
				<div className="space-y-6">
					{/* Details */}
					<Card className="p-6">
						<h2 className="text-lg font-semibold mb-4">Details</h2>
						<div className="space-y-4">
							<div className="flex items-center gap-2">
								<Users className="h-4 w-4 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium">Business Owner</p>
									<p className="text-sm text-muted-foreground">
										{demand.businessOwner}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<Calendar className="h-4 w-4 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium">Release Month</p>
									<p className="text-sm text-muted-foreground">
										{demand.releaseMonth || "Not scheduled"}
									</p>
								</div>
							</div>
							{demand.baselineReleaseMonth && (
								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4 text-muted-foreground" />
									<div>
										<p className="text-sm font-medium">Baseline Release</p>
										<p className="text-sm text-muted-foreground">
											{demand.baselineReleaseMonth}
										</p>
									</div>
								</div>
							)}
							{demand.revisedReleaseMonth && (
								<div className="flex items-center gap-2">
									<Calendar className="h-4 w-4 text-muted-foreground" />
									<div>
										<p className="text-sm font-medium">Revised Release</p>
										<p className="text-sm text-muted-foreground">
											{demand.revisedReleaseMonth}
										</p>
									</div>
								</div>
							)}
						</div>
					</Card>

					{/* Stages */}
					<Card className="p-6">
						<h2 className="text-lg font-semibold mb-4">Stages</h2>
						<div className="space-y-4">
							{demand.demandStages.map((stage) => (
								<div
									key={stage.id}
									className="flex items-center justify-between p-4 border rounded-lg"
								>
									<div>
										<p className="font-medium">{stage.name}</p>
										<p className="text-sm text-muted-foreground">
											{stage.description}
										</p>
									</div>
									<Badge variant="secondary">{stage.status}</Badge>
								</div>
							))}
						</div>
					</Card>
				</div>
			</div>

			{/* Work Plan Dialog */}
			<Dialog open={isWorkPlanDialogOpen} onOpenChange={setIsWorkPlanDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create Work Plan</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleCreateWorkPlan} className="space-y-4">
						<div className="space-y-2">
							<label className="text-sm font-medium">Title</label>
							<Input name="title" required />
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">Description</label>
							<Textarea name="description" required />
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="text-sm font-medium">Start Date</label>
								<Input type="date" name="startDate" required />
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">End Date</label>
								<Input type="date" name="endDate" required />
							</div>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">Submission Deadline</label>
							<Input type="date" name="deadline" required />
						</div>
						<div className="flex justify-end gap-2">
							<Button
								type="button"
								variant="outline"
								onClick={() => setIsWorkPlanDialogOpen(false)}
							>
								Cancel
							</Button>
							<Button type="submit">Create Work Plan</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>

			{/* Task Dialog */}
			<Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create Task</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleCreateTask} className="space-y-4">
						<div className="space-y-2">
							<label className="text-sm font-medium">Title</label>
							<Input name="title" required />
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">Description</label>
							<Textarea name="description" required />
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="text-sm font-medium">Deadline</label>
								<Input type="date" name="deadline" required />
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">Story Points</label>
								<Input type="number" name="storyPoints" required min="1" />
							</div>
						</div>
						<div className="flex justify-end gap-2">
							<Button
								type="button"
								variant="outline"
								onClick={() => setIsTaskDialogOpen(false)}
							>
								Cancel
							</Button>
							<Button type="submit">Create Task</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
