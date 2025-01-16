import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDemands } from "@/hooks/useDemands";
import { useClients } from "@/hooks/useClients";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ChannelsEnum, DemandStatus, DemandType, ROLE } from "@/types/enums";
import { CreateDemand, PaymentMode } from "@/types/api";

const initialFormData: CreateDemand = {
	title: "",
	demandCreatorRole: ROLE.SUPPORT,
	demandSummary: "",
	description: "",
	businessOwner: "",
	organisation: "",
	demandType: DemandType.NEW_PROJECT,
	status: DemandStatus.SOLUTION,
	channelsImpacted: [],
	paymentMode: [],
	businessPriorityMapping: "",
	departmentName: "",
	priorityNumber: 0,
	clientId: "",
};

export default function DemandsNew() {
	const navigate = useNavigate();
	const { createDemand } = useDemands({});
	const { clients } = useClients();
	const [formData, setFormData] = useState<CreateDemand>(initialFormData);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await createDemand(formData);
			toast.success("Demand created successfully");
			navigate("/demands");
		} catch (error) {
			toast.error("Failed to create demand");
		}
	};

	return (
		<div className="p-6 space-y-6">
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
					<h1 className="text-2xl font-bold">Create New Demand</h1>
					<p className="text-sm text-muted-foreground">
						Create a new project demand request
					</p>
				</div>
			</div>

			<Card>
				<form onSubmit={handleSubmit} className="p-6 space-y-6">
					{/* Basic Information */}
					<div className="space-y-4">
						<h2 className="text-lg font-semibold">Basic Information</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="text-sm font-medium">
									Title <span className="text-red-500">*</span>
								</label>
								<Input
									value={formData.title}
									onChange={(e) =>
										setFormData((prev) => ({ ...prev, title: e.target.value }))
									}
									placeholder="Enter demand title"
									required
								/>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">
									Client <span className="text-red-500">*</span>
								</label>
								<Select
									value={formData.clientId}
									onValueChange={(value) =>
										setFormData((prev) => ({ ...prev, clientId: value }))
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select client" />
									</SelectTrigger>
									<SelectContent>
										{clients.map((client) => (
											<SelectItem key={client.id} value={String(client.id)}>
												{client.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">
								Summary <span className="text-red-500">*</span>
							</label>
							<Input
								value={formData.demandSummary}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										demandSummary: e.target.value,
									}))
								}
								placeholder="Enter a brief summary of the demand"
								required
							/>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Description</label>
							<Input
								value={formData.description}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										description: e.target.value,
									}))
								}
								placeholder="Enter detailed description"
							/>
						</div>
					</div>

					{/* Classification */}
					<div className="space-y-4">
						<h2 className="text-lg font-semibold">Classification</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="text-sm font-medium">Demand Type</label>
								<Select
									value={formData.demandType}
									onValueChange={(value) =>
										setFormData((prev) => ({
											...prev,
											demandType: value as DemandType,
										}))
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{Object.values(DemandType).map((type) => (
											<SelectItem key={type} value={type}>
												{type}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">Initial Status</label>
								<Select
									value={formData.status}
									onValueChange={(value) =>
										setFormData((prev) => ({
											...prev,
											status: value as DemandStatus,
										}))
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{Object.values(DemandStatus).map((status) => (
											<SelectItem key={status} value={status}>
												{status}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Channels Impacted</label>
							<div className="flex flex-wrap gap-2">
								{Object.values(ChannelsEnum).map((channel) => (
									<Button
										key={channel}
										type="button"
										variant={
											formData.channelsImpacted.includes(channel)
												? "default"
												: "outline"
										}
										onClick={() =>
											setFormData((prev) => ({
												...prev,
												channelsImpacted: prev.channelsImpacted.includes(
													channel
												)
													? prev.channelsImpacted.filter(
															(c) => c !== channel
													  )
													: [...prev.channelsImpacted, channel],
											}))
										}
										className="h-8"
									>
										{channel}
									</Button>
								))}
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Payment Modes</label>
							<div className="flex flex-wrap gap-2">
								{Object.values(PaymentMode).map((mode) => (
									<Button
										key={mode}
										type="button"
										variant={
											formData.paymentMode.includes(mode)
												? "default"
												: "outline"
										}
										onClick={() =>
											setFormData((prev) => ({
												...prev,
												paymentMode: prev.paymentMode.includes(mode)
													? prev.paymentMode.filter((m) => m !== mode)
													: [...prev.paymentMode, mode],
											}))
										}
										className="h-8"
									>
										{mode}
									</Button>
								))}
							</div>
						</div>
					</div>

					{/* Additional Details */}
					<div className="space-y-4">
						<h2 className="text-lg font-semibold">Additional Details</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="text-sm font-medium">
									Business Owner <span className="text-red-500">*</span>
								</label>
								<Input
									value={formData.businessOwner}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											businessOwner: e.target.value,
										}))
									}
									placeholder="Enter business owner name"
									required
								/>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">Department</label>
								<Input
									value={formData.departmentName}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											departmentName: e.target.value,
										}))
									}
									placeholder="Enter department name"
								/>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">Organisation</label>
								<Input
									value={formData.organisation}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											organisation: e.target.value,
										}))
									}
									placeholder="Enter organisation name"
								/>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">Priority Number</label>
								<Input
									type="number"
									value={formData.priorityNumber}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											priorityNumber: parseInt(e.target.value) || 0,
										}))
									}
									placeholder="Enter priority number"
								/>
							</div>
						</div>
					</div>

					<div className="flex justify-end gap-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => navigate("/demands")}
						>
							Cancel
						</Button>
						<Button type="submit">Create Demand</Button>
					</div>
				</form>
			</Card>
		</div>
	);
}
