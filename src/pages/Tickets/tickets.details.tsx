import { useTickets } from "@/hooks/useTickets";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TicketStatus, TicketPriority } from "@/types/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

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

export default function TicketDetails() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { currentTicket, updateTicketStatus, assignTicket, deleteTicket, addComment, isLoading } =
		useTickets(id);
	const [newComment, setNewComment] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	if (isLoading) {
		return (
			<div className="p-6 space-y-6">
				{/* Header skeleton */}
				<div className="flex items-center justify-between">
					<div className="space-y-2">
						<Skeleton className="h-8 w-[300px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
					<div className="flex items-center gap-2">
						<Skeleton className="h-9 w-24" />
						<Skeleton className="h-9 w-24" />
					</div>
				</div>

				{/* Status and priority skeletons */}
				<div className="flex items-center gap-4">
					<Skeleton className="h-6 w-24" />
					<Skeleton className="h-6 w-24" />
				</div>

				{/* Assignee skeleton */}
				<div className="space-y-2">
					<Skeleton className="h-4 w-20" />
					<div className="flex items-center gap-2">
						<Skeleton className="h-8 w-8 rounded-full" />
						<Skeleton className="h-8 w-[200px]" />
					</div>
				</div>

				{/* Description skeleton */}
				<div className="space-y-2">
					<Skeleton className="h-4 w-24" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-[90%]" />
						<Skeleton className="h-4 w-[80%]" />
					</div>
				</div>

				{/* Attachments skeleton */}
				<div className="space-y-2">
					<Skeleton className="h-4 w-24" />
					<div className="flex items-center gap-2">
						<Skeleton className="h-10 w-[200px]" />
						<Skeleton className="h-10 w-[200px]" />
					</div>
				</div>

				{/* Comments skeleton */}
				<div className="space-y-4">
					<Skeleton className="h-4 w-24" />
					<div className="space-y-4">
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Skeleton className="h-8 w-8 rounded-full" />
								<div className="space-y-1">
									<Skeleton className="h-4 w-[150px]" />
									<Skeleton className="h-3 w-[100px]" />
								</div>
							</div>
							<Skeleton className="h-16 w-full" />
						</div>
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Skeleton className="h-8 w-8 rounded-full" />
								<div className="space-y-1">
									<Skeleton className="h-4 w-[150px]" />
									<Skeleton className="h-3 w-[100px]" />
								</div>
							</div>
							<Skeleton className="h-16 w-full" />
						</div>
					</div>
				</div>

				{/* Comment input skeleton */}
				<div className="space-y-2">
					<Skeleton className="h-24 w-full" />
					<div className="flex justify-end">
						<Skeleton className="h-9 w-24" />
					</div>
				</div>
			</div>
		);
	}

	if (!currentTicket) {
		return (
			<div className="flex h-[50vh] flex-col items-center justify-center gap-4">
				<h2 className="text-2xl font-bold">Ticket not found</h2>
				<Button onClick={() => navigate("/tickets")}>Back to Tickets</Button>
			</div>
		);
	}

	const handleStatusChange = (status: string) => {
		try {
			updateTicketStatus({ id: currentTicket.id, status });
			toast.success("Ticket status updated");
		} catch (error) {
			toast.error("Failed to update ticket status");
		}
	};

	const handleAssign = (userId: string) => {
		try {
			assignTicket({ id: currentTicket.id, assignedTo: userId });
			toast.success("Ticket assigned successfully");
		} catch (error) {
			toast.error("Failed to assign ticket");
		}
	};

	const handleDelete = () => {
		if (!window.confirm("Are you sure you want to delete this ticket?")) return;

		try {
			deleteTicket(currentTicket.id);
			toast.success("Ticket deleted successfully");
			navigate("/tickets");
		} catch (error) {
			toast.error("Failed to delete ticket");
		}
	};

	const handleAddComment = () => {
		if (!newComment.trim()) return;

		setIsSubmitting(true);
		try {
			addComment({ id: currentTicket.id, comment: newComment });
			setNewComment("");
			toast.success("Comment added successfully");
		} catch (error) {
			toast.error("Failed to add comment");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="h-full flex flex-col">
			{/* Header */}
			<div className="p-4 border-b">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-4">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => navigate(-1)}
							className="rounded-full"
						>
							<ArrowLeft className="h-4 w-4" />
						</Button>
						<div>
							<div className="flex items-center gap-2">
								<h1 className="text-2xl font-bold">{currentTicket.subject}</h1>
								<Badge variant="outline">{currentTicket.ticketNumber}</Badge>
							</div>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<span>
									Created on{" "}
									{new Date(currentTicket.createdAt).toLocaleDateString()}
								</span>
								<span>·</span>
								<span>Ticket #{currentTicket.messageId}</span>
							</div>
						</div>
					</div>
					<Button variant="destructive" size="sm" onClick={handleDelete}>
						<Trash2 className="h-4 w-4 mr-2" />
						Delete Ticket
					</Button>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 overflow-auto p-4">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
					{/* Left Column - Details and Comments */}
					<div className="lg:col-span-2 space-y-4">
						{/* Status, Priority and Type */}
						<Card className="p-4 space-y-4">
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
								<div className="space-y-2">
									<h3 className="text-sm font-medium text-muted-foreground">
										Status
									</h3>
									<Select
										value={currentTicket.status}
										onValueChange={handleStatusChange}
									>
										<SelectTrigger>
											<SelectValue>
												<span
													className={cn(
														"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
														statusColors[
															currentTicket.status as TicketStatus
														]
													)}
												>
													{currentTicket.status}
												</span>
											</SelectValue>
										</SelectTrigger>
										<SelectContent>
											{Object.values(TicketStatus).map((status) => (
												<SelectItem key={status} value={status}>
													<span
														className={cn(
															"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
															statusColors[status as TicketStatus]
														)}
													>
														{status}
													</span>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<h3 className="text-sm font-medium text-muted-foreground">
										Priority
									</h3>
									<Badge
										variant="secondary"
										className={cn(
											"text-xs",
											priorityColors[currentTicket.priority]
										)}
									>
										{currentTicket.priority}
									</Badge>
								</div>

								<div className="space-y-2">
									<h3 className="text-sm font-medium text-muted-foreground">
										Type
									</h3>
									<Badge variant="outline">{currentTicket.ticketType}</Badge>
								</div>
							</div>
						</Card>

						{/* Description */}
						<Card className="p-4 space-y-2">
							<h2 className="font-semibold">Description</h2>
							<p className="text-sm whitespace-pre-wrap">{currentTicket.body}</p>
						</Card>

						{/* Attachments */}
						{currentTicket.attachments && currentTicket.attachments.length > 0 && (
							<Card className="p-4 space-y-2">
								<h2 className="font-semibold">Attachments</h2>
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
									{currentTicket.attachments.map((attachment, index) => (
										<Button
											key={index}
											variant="outline"
											className="justify-start"
										>
											{attachment}
										</Button>
									))}
								</div>
							</Card>
						)}

						{/* Comments */}
						<div className="space-y-4">
							<h2 className="font-semibold">Comments</h2>
							<div className="space-y-4">
								{currentTicket.comments?.map((comment) => (
									<Card key={comment.id} className="p-4 space-y-2">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
													{comment.createdBy?.[0]?.toUpperCase()}
												</div>
												<span className="font-medium">
													{comment.createdBy}
												</span>
											</div>
											<span className="text-sm text-muted-foreground">
												{new Date(comment.createdAt).toLocaleString()}
											</span>
										</div>
										<p className="text-sm whitespace-pre-wrap">
											{comment.comment}
										</p>
									</Card>
								))}
							</div>

							{/* Add Comment */}
							<Card className="p-4 space-y-4">
								<Textarea
									placeholder="Add a comment..."
									value={newComment}
									onChange={(e) => setNewComment(e.target.value)}
									className="min-h-[100px]"
								/>
								<div className="flex justify-end">
									<Button
										onClick={handleAddComment}
										disabled={isSubmitting || !newComment.trim()}
									>
										{isSubmitting && (
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										)}
										Add Comment
									</Button>
								</div>
							</Card>
						</div>
					</div>

					{/* Right Column - Metadata */}
					<div className="space-y-4">
						<Card className="p-4 space-y-4">
							{/* Assignee */}
							<div className="space-y-2">
								<h3 className="font-semibold">Assignee</h3>
								<Select
									value={currentTicket.assignedTo?.id || ""}
									onValueChange={handleAssign}
								>
									<SelectTrigger>
										<SelectValue>
											{currentTicket.assignedTo ? (
												<div className="flex items-center gap-2">
													<div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
														{currentTicket.assignedTo.firstname[0]}
														{currentTicket.assignedTo.lastname[0]}
													</div>
													<span>
														{currentTicket.assignedTo.firstname}{" "}
														{currentTicket.assignedTo.lastname}
													</span>
												</div>
											) : (
												"Assign ticket"
											)}
										</SelectValue>
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="user1">John Doe</SelectItem>
										<SelectItem value="user2">Jane Smith</SelectItem>
									</SelectContent>
								</Select>
								{currentTicket.assignedAt && (
									<p className="text-sm text-muted-foreground">
										Assigned on{" "}
										{new Date(currentTicket.assignedAt).toLocaleString()}
									</p>
								)}
							</div>

							{/* SLA Status */}
							<div className="space-y-2">
								<h3 className="font-semibold">SLA Status</h3>
								<div className="space-y-1">
									<Badge variant="outline">{currentTicket.slaStatus}</Badge>
									<p className="text-sm text-muted-foreground">
										SLA Percentage: {currentTicket.slaPercentage}
									</p>
								</div>
							</div>

							{/* Recipients */}
							{((currentTicket.to && currentTicket.to.length > 0) ||
								(currentTicket.cc && currentTicket.cc.length > 0)) && (
								<div className="space-y-2">
									<h3 className="font-semibold">Recipients</h3>
									{currentTicket.to && currentTicket.to.length > 0 && (
										<div className="space-y-1">
											<p className="text-sm font-medium">To:</p>
											<p className="text-sm text-muted-foreground">
												{currentTicket.to.join(", ")}
											</p>
										</div>
									)}
									{currentTicket.cc && currentTicket.cc.length > 0 && (
										<div className="space-y-1">
											<p className="text-sm font-medium">CC:</p>
											<p className="text-sm text-muted-foreground">
												{currentTicket.cc?.join(", ")}
											</p>
										</div>
									)}
								</div>
							)}

							{/* Timestamps */}
							<div className="space-y-4">
								<div className="space-y-2">
									<h3 className="font-semibold">Created By</h3>
									<div className="flex items-center gap-2">
										<div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
											{currentTicket.createdBy[0]?.toUpperCase()}
										</div>
										<span>{currentTicket.createdBy}</span>
									</div>
								</div>

								<div className="space-y-2">
									<h3 className="font-semibold">Timestamps</h3>
									<div className="space-y-1 text-sm">
										<p className="text-muted-foreground">
											Created:{" "}
											{new Date(currentTicket.createdAt).toLocaleString()}
										</p>
										<p className="text-muted-foreground">
											Updated:{" "}
											{new Date(currentTicket.updatedAt).toLocaleString()}
										</p>
										{currentTicket.resolvedAt && (
											<p className="text-muted-foreground">
												Resolved:{" "}
												{new Date(
													currentTicket.resolvedAt
												).toLocaleString()}
											</p>
										)}
										{currentTicket.closedAt && (
											<p className="text-muted-foreground">
												Closed:{" "}
												{new Date(currentTicket.closedAt).toLocaleString()}
											</p>
										)}
										{currentTicket.blockedAt && (
											<p className="text-muted-foreground">
												Blocked:{" "}
												{new Date(currentTicket.blockedAt).toLocaleString()}
											</p>
										)}
										{currentTicket.reOpenedAt && (
											<p className="text-muted-foreground">
												Reopened:{" "}
												{new Date(
													currentTicket.reOpenedAt
												).toLocaleString()}
											</p>
										)}
									</div>
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
