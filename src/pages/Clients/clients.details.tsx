import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useClients } from "@/hooks/useClients";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Building2, Calendar, Mail, Phone, MapPin, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const clientTypes = [
	"Enterprise",
	"Corporate",
	"Healthcare",
	"Education",
	"Financial",
	"Energy",
	"IoT",
	"Logistics",
	"Media",
	"Retail",
];

const typeColors: Record<string, string> = {
	Enterprise: "bg-purple-500/10 text-purple-500",
	Corporate: "bg-blue-500/10 text-blue-500",
	Healthcare: "bg-green-500/10 text-green-500",
	Education: "bg-orange-500/10 text-orange-500",
	Financial: "bg-indigo-500/10 text-indigo-500",
	Energy: "bg-yellow-500/10 text-yellow-500",
	IoT: "bg-pink-500/10 text-pink-500",
	Logistics: "bg-cyan-500/10 text-cyan-500",
	Media: "bg-red-500/10 text-red-500",
	Retail: "bg-emerald-500/10 text-emerald-500",
};

export default function ClientsDetails() {
	const navigate = useNavigate();
	const { id } = useParams();
	const { client, isLoading, updateClient, deleteClient } = useClients(id);
	const [isEditing, setIsEditing] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [formData, setFormData] = useState({
		name: client?.name || "",
		email: client?.email || "",
		phoneNumber: client?.phoneNumber || "",
		address: client?.address || "",
		type: client?.type || "",
		isActive: client?.isActive || false,
	});

	if (isLoading) {
		return (
			<div className="p-6 space-y-6">
				<div className="flex items-center gap-4">
					<Skeleton className="h-10 w-10" />
					<Skeleton className="h-8 w-48" />
				</div>
				<Card className="p-6">
					<div className="space-y-6">
						<div className="space-y-2">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-10 w-full" />
						</div>
						<div className="space-y-2">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-10 w-full" />
						</div>
						<div className="space-y-2">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-10 w-full" />
						</div>
					</div>
				</Card>
			</div>
		);
	}

	if (!client) {
		return (
			<div className="p-6">
				<Card className="p-6 text-center">
					<h2 className="text-lg font-semibold">Client not found</h2>
					<p className="text-muted-foreground mt-2">
						The client you're looking for doesn't exist or has been deleted.
					</p>
					<Button className="mt-4" onClick={() => navigate("/clients")}>
						Back to Clients
					</Button>
				</Card>
			</div>
		);
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await updateClient({ id: id!, data: formData });
			toast.success("Client updated successfully");
			setIsEditing(false);
		} catch (error) {
			toast.error("Failed to update client");
		}
	};

	const handleDelete = async () => {
		try {
			await deleteClient(id!);
			toast.success("Client deleted successfully");
			navigate("/clients");
		} catch (error) {
			toast.error("Failed to delete client");
		}
	};

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Button variant="ghost" size="icon" onClick={() => navigate("/clients")}>
						<ArrowLeft className="h-4 w-4" />
					</Button>
					<div className="flex items-center gap-3">
						<Building2 className="h-6 w-6" />
						<h1 className="text-2xl font-semibold">{client.name}</h1>
						<Badge
							variant="secondary"
							className={typeColors[client.type] || "bg-gray-500/10 text-gray-500"}
						>
							{client.type}
						</Badge>
						<Badge
							variant="secondary"
							className={
								client.isActive
									? "bg-green-500/10 text-green-500"
									: "bg-red-500/10 text-red-500"
							}
						>
							{client.isActive ? "Active" : "Inactive"}
						</Badge>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						onClick={() => {
							if (isEditing) {
								setFormData({
									name: client.name,
									email: client.email,
									phoneNumber: client.phoneNumber,
									address: client.address,
									type: client.type,
									isActive: client.isActive,
								});
							}
							setIsEditing(!isEditing);
						}}
					>
						{isEditing ? "Cancel" : "Edit"}
					</Button>
					<Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
						<Trash2 className="h-4 w-4 mr-2" />
						Delete
					</Button>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-2">
				<Card className="p-6">
					{isEditing ? (
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<label className="text-sm font-medium">Name</label>
								<Input
									value={formData.name}
									onChange={(e) =>
										setFormData((prev) => ({ ...prev, name: e.target.value }))
									}
								/>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium">Type</label>
								<Select
									value={formData.type}
									onValueChange={(value) =>
										setFormData((prev) => ({ ...prev, type: value }))
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{clientTypes.map((type) => (
											<SelectItem key={type} value={type}>
												{type}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium">Status</label>
								<Select
									value={formData.isActive ? "active" : "inactive"}
									onValueChange={(value) =>
										setFormData((prev) => ({
											...prev,
											isActive: value === "active",
										}))
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="active">Active</SelectItem>
										<SelectItem value="inactive">Inactive</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium">Email</label>
								<Input
									type="email"
									value={formData.email}
									onChange={(e) =>
										setFormData((prev) => ({ ...prev, email: e.target.value }))
									}
								/>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium">Phone Number</label>
								<Input
									value={formData.phoneNumber}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											phoneNumber: e.target.value,
										}))
									}
								/>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium">Address</label>
								<Input
									value={formData.address}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											address: e.target.value,
										}))
									}
								/>
							</div>

							<div className="flex justify-end">
								<Button type="submit">Save Changes</Button>
							</div>
						</form>
					) : (
						<div className="space-y-6">
							<div className="flex items-center gap-2">
								<Mail className="h-4 w-4 text-muted-foreground" />
								<span>{client.email}</span>
							</div>
							<div className="flex items-center gap-2">
								<Phone className="h-4 w-4 text-muted-foreground" />
								<span>{client.phoneNumber}</span>
							</div>
							<div className="flex items-center gap-2">
								<MapPin className="h-4 w-4 text-muted-foreground" />
								<span>{client.address}</span>
							</div>
							<div className="flex items-center gap-2">
								<Calendar className="h-4 w-4 text-muted-foreground" />
								<div className="space-y-1">
									<p className="text-sm">
										Created: {new Date(client.createdAt).toLocaleDateString()}
									</p>
									<p className="text-sm">
										Last Updated:{" "}
										{new Date(client.updatedAt).toLocaleDateString()}
									</p>
								</div>
							</div>
						</div>
					)}
				</Card>

				<Card className="p-6">
					<h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
					<div className="text-muted-foreground text-sm">No recent activity</div>
				</Card>
			</div>

			<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the client
							and remove all associated data.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							className="bg-red-500 hover:bg-red-600"
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
