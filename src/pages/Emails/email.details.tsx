import { useState } from "react";
import { useEmail } from "@/hooks/useEmail";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	ArrowLeft,
	Forward,
	Reply,
	ReplyAll,
	Trash2,
	RotateCcw,
	MoreHorizontal,
} from "lucide-react";
import { toast } from "sonner";

export default function EmailDetails() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const location = useLocation();
	const [isPersonal, setIsPersonal] = useState(false);
	const { useGetMessage } = useEmail();

	const { data: message, isLoading } = useGetMessage(id || "", isPersonal);

	const isTrash = location.pathname.includes("/trash");
	const isDraft = location.pathname.includes("/drafts");

	const getMessageHeader = (name: string) => {
		return (
			message?.payload.headers.find(
				(header) => header.name.toLowerCase() === name.toLowerCase()
			)?.value || ""
		);
	};

	const formatDate = (date: string) => {
		return new Date(parseInt(date)).toLocaleString(undefined, {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const handleReply = () => {
		navigate(`/emails/new?reply=${message?.id}`);
	};

	const handleReplyAll = () => {
		navigate(`/emails/new?replyAll=${message?.id}`);
	};

	const handleForward = () => {
		navigate(`/emails/new?forward=${message?.id}`);
	};

	const handleRestore = () => {
		// TODO: Implement restore functionality
		toast.success("Email restored successfully");
		navigate(-1);
	};

	const handleDelete = () => {
		// TODO: Implement delete functionality
		toast.success(isTrash ? "Email permanently deleted" : "Email moved to trash");
		navigate(-1);
	};

	const handleEdit = () => {
		navigate(`/emails/new?draft=${message?.id}`);
	};

	if (isLoading) {
		return (
			<div className="h-full p-4 space-y-4">
				<div className="flex items-center gap-4">
					<Skeleton className="h-10 w-10 rounded-full" />
					<div className="space-y-2 flex-1">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
				<Skeleton className="h-[200px]" />
			</div>
		);
	}

	if (!message) {
		return (
			<div className="h-full flex items-center justify-center">
				<p className="text-muted-foreground">Email not found</p>
			</div>
		);
	}

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
						<h1 className="text-2xl font-bold">{getMessageHeader("subject")}</h1>
					</div>
					<div className="flex items-center gap-2">
						{!isDraft && !isTrash && (
							<>
								<Button variant="ghost" size="icon" onClick={handleReply}>
									<Reply className="h-4 w-4" />
								</Button>
								<Button variant="ghost" size="icon" onClick={handleReplyAll}>
									<ReplyAll className="h-4 w-4" />
								</Button>
								<Button variant="ghost" size="icon" onClick={handleForward}>
									<Forward className="h-4 w-4" />
								</Button>
							</>
						)}
						{isDraft && <Button onClick={handleEdit}>Edit Draft</Button>}
						{isTrash ? (
							<>
								<Button variant="ghost" size="icon" onClick={handleRestore}>
									<RotateCcw className="h-4 w-4" />
								</Button>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="icon">
											<MoreHorizontal className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem
											className="text-destructive"
											onClick={handleDelete}
										>
											<Trash2 className="h-4 w-4 mr-2" />
											Delete Permanently
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</>
						) : (
							<Button
								variant="ghost"
								size="icon"
								onClick={handleDelete}
								className="text-destructive"
							>
								<Trash2 className="h-4 w-4" />
							</Button>
						)}
					</div>
				</div>
			</div>

			{/* Email Content */}
			<div className="flex-1 overflow-auto p-4">
				<Card className="mx-auto">
					<div className="p-6">
						<div className="space-y-4">
							{/* Email Headers */}
							<div className="space-y-2 pb-4 border-b">
								<div className="flex justify-between items-start">
									<div>
										<div className="font-medium">
											From: {getMessageHeader("from")}
										</div>
										<div className="text-sm text-muted-foreground">
											To: {getMessageHeader("to")}
										</div>
										{getMessageHeader("cc") && (
											<div className="text-sm text-muted-foreground">
												Cc: {getMessageHeader("cc")}
											</div>
										)}
									</div>
									<div className="text-sm text-muted-foreground">
										{formatDate(message.internalDate)}
									</div>
								</div>
							</div>

							{/* Email Body */}
							<div className="prose prose-sm max-w-none">
								{message.payload.body.data}
							</div>

							{/* Attachments would go here */}
							{/* TODO: Add attachments section */}
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
