import { useTickets } from "@/hooks/useTickets";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TicketPriority, TicketRequestTypes } from "@/types/api";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ticketFormSchema = z.object({
	subject: z.string().min(1, "Subject is required").max(255),
	body: z.string().min(1, "Description is required"),
	priority: z.nativeEnum(TicketPriority),
	ticketType: z.nativeEnum(TicketRequestTypes),
});

type TicketFormValues = z.infer<typeof ticketFormSchema>;

const defaultValues: Partial<TicketFormValues> = {
	priority: TicketPriority.LOW,
	ticketType: TicketRequestTypes.CHANGE,
};

export default function TicketsNew() {
	const { addTicket } = useTickets();
	const navigate = useNavigate();
	const form = useForm<TicketFormValues>({
		resolver: zodResolver(ticketFormSchema),
		defaultValues,
	});

	const onSubmit = (data: TicketFormValues) => {
		try {
			addTicket(data);
			toast.success("Ticket created successfully");
			navigate("/tickets");
		} catch (error) {
			toast.error("Failed to create ticket");
		}
	};

	return (
		<div className="p-6 space-y-6">
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
					<h1 className="text-3xl font-bold">Create New Ticket</h1>
					<p className="text-muted-foreground">
						Fill in the details below to create a new support ticket
					</p>
				</div>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<FormField
						control={form.control}
						name="subject"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Subject</FormLabel>
								<FormControl>
									<Input placeholder="Enter ticket subject" {...field} />
								</FormControl>
								<FormDescription>
									A clear and concise subject helps in quick identification
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="body"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Provide detailed description of the issue or request"
										className="min-h-[150px]"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Include all relevant details, steps to reproduce if applicable
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="priority"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Priority</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select priority" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.values(TicketPriority).map((priority) => (
												<SelectItem key={priority} value={priority}>
													{priority}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>
										Set the urgency level of this ticket
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="ticketType"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Type</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select type" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.values(TicketRequestTypes).map((type) => (
												<SelectItem key={type} value={type}>
													{type}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormDescription>
										Categorize the type of request
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="flex justify-end gap-4">
						<Button type="button" variant="outline" onClick={() => navigate(-1)}>
							Cancel
						</Button>
						<Button type="submit" disabled={form.formState.isSubmitting}>
							{form.formState.isSubmitting && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Create Ticket
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
