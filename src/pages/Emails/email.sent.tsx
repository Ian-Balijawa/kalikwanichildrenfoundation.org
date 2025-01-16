import { useState } from "react";
import { useEmail } from "@/hooks/useEmail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Message } from "@/types/email";
import { Link } from "react-router-dom";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, Forward, Trash2, MoreHorizontal } from "lucide-react";

export default function EmailsSent() {
	const { useGetSent } = useEmail();
	const [searchQuery, setSearchQuery] = useState("");
	const [isPersonal, setIsPersonal] = useState(false);
	const { data: messages = [], isLoading } = useGetSent(isPersonal);

	const filteredMessages = messages.filter((message) => {
		const searchContent = [
			message.snippet,
			...message.payload.headers
				.filter((header) => ["subject", "to"].includes(header.name.toLowerCase()))
				.map((header) => header.value),
		]
			.join(" ")
			.toLowerCase();

		return searchContent.includes(searchQuery.toLowerCase());
	});

	const getMessageSubject = (message: Message) => {
		return (
			message.payload.headers.find((header) => header.name.toLowerCase() === "subject")
				?.value || "No Subject"
		);
	};

	const getMessageRecipient = (message: Message) => {
		return (
			message.payload.headers.find((header) => header.name.toLowerCase() === "to")?.value ||
			"No Recipient"
		);
	};

	const formatDate = (date: string) => {
		const messageDate = new Date(parseInt(date));
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(yesterday.getDate() - 1);

		if (messageDate.toDateString() === today.toDateString()) {
			return messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
		} else if (messageDate.toDateString() === yesterday.toDateString()) {
			return "Yesterday";
		} else {
			return messageDate.toLocaleDateString();
		}
	};

	return (
		<div className="h-full flex flex-col">
			{/* Header */}
			<div className="p-4 border-b">
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-2xl font-bold">Sent</h1>
					<Button variant="outline" size="sm" onClick={() => setIsPersonal(!isPersonal)}>
						{isPersonal ? "Show Work" : "Show Personal"}
					</Button>
				</div>
				<div className="flex gap-2">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search sent emails..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-9"
						/>
					</div>
					<Button variant="outline" size="icon">
						<Filter className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{/* Messages List */}
			<div className="flex-1 overflow-auto">
				{isLoading ? (
					<div className="space-y-4 p-4">
						{[...Array(5)].map((_, i) => (
							<div key={i} className="flex gap-4 items-center">
								<Skeleton className="h-6 w-6 rounded-full" />
								<div className="space-y-2 flex-1">
									<Skeleton className="h-4 w-[250px]" />
									<Skeleton className="h-4 w-full" />
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="divide-y">
						{filteredMessages.map((message) => (
							<div
								key={message.id}
								className="p-4 hover:bg-muted/50 transition-colors flex items-start gap-4"
							>
								<Link to={`/emails/sent/${message.id}`} className="flex-1 min-w-0">
									<div className="flex items-center justify-between gap-2 mb-1">
										<div className="font-medium truncate">
											To: {getMessageRecipient(message)}
										</div>
										<div className="text-sm text-muted-foreground whitespace-nowrap">
											{formatDate(message.internalDate)}
										</div>
									</div>
									<div className="font-medium mb-1 truncate">
										{getMessageSubject(message)}
									</div>
									<div className="text-sm text-muted-foreground truncate">
										{message.snippet}
									</div>
								</Link>
								<div className="flex items-center gap-2">
									<Button variant="ghost" size="icon" asChild>
										<Link to={`/emails/new?forward=${message.id}`}>
											<Forward className="h-4 w-4" />
										</Link>
									</Button>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon">
												<MoreHorizontal className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem className="text-destructive">
												<Trash2 className="h-4 w-4 mr-2" />
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
