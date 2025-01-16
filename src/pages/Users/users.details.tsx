import { useUsers } from "@/hooks/useUsers";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROLE } from "@/types/api";
import { cn } from "@/lib/utils";
import { ArrowLeft, Mail, Phone, Calendar, Shield, Trash2, Clock } from "lucide-react";
import { toast } from "sonner";

const roleColors: Record<ROLE, string> = {
	[ROLE.ADMIN]: "bg-purple-500/10 text-purple-500",
	[ROLE.DEVELOPER]: "bg-blue-500/10 text-blue-500",
	[ROLE.SUPPORT]: "bg-green-500/10 text-green-500",
	[ROLE.SUPPORT_ADMIN]: "bg-indigo-500/10 text-indigo-500",
	[ROLE.BA]: "bg-orange-500/10 text-orange-500",
	[ROLE.CUSTOMER]: "bg-gray-500/10 text-gray-500",
	["Super User"]: "bg-red-500/10 text-red-500",
	[ROLE.PROJECT_MANAGER]: "bg-yellow-500/10 text-yellow-500",
	[ROLE.QUALITY_ANALYST]: "bg-pink-500/10 text-pink-500",
};

export default function UserDetails() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const {
		user,
		isLoading,
		deleteUser,
		markUserOnDuty,
		markUserOnLeave,
		removeUserFromDuty,
		removeUserFromLeave,
	} = useUsers(id);

	if (isLoading) {
		return (
			<div className="p-4 md:p-6 space-y-6">
				<div className="animate-pulse space-y-6">
					<div className="h-8 w-48 bg-muted rounded" />
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						<div className="lg:col-span-2 space-y-6">
							<div className="h-40 bg-muted rounded" />
							<div className="h-60 bg-muted rounded" />
						</div>
						<div className="space-y-6">
							<div className="h-40 bg-muted rounded" />
							<div className="h-40 bg-muted rounded" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (!user) {
		return (
			<div className="flex h-[50vh] flex-col items-center justify-center gap-4">
				<h2 className="text-2xl font-bold">User not found</h2>
				<Button onClick={() => navigate("/users")}>Back to Users</Button>
			</div>
		);
	}

	const handleDelete = () => {
		if (!window.confirm("Are you sure you want to delete this user?")) return;

		try {
			deleteUser(user.id);
			toast.success("User deleted successfully");
			navigate("/users");
		} catch (error) {
			toast.error("Failed to delete user");
		}
	};

	const handleDutyChange = (action: "duty" | "leave" | "remove-duty" | "remove-leave") => {
		try {
			switch (action) {
				case "duty":
					markUserOnDuty(user.id);
					toast.success("User marked as on duty");
					break;
				case "leave":
					markUserOnLeave(user.id);
					toast.success("User marked as on leave");
					break;
				case "remove-duty":
					removeUserFromDuty(user.id);
					toast.success("User removed from duty");
					break;
				case "remove-leave":
					removeUserFromLeave(user.id);
					toast.success("User removed from leave");
					break;
			}
		} catch (error) {
			toast.error("Failed to update user status");
		}
	};

	return (
		<div className="p-4 md:p-6 space-y-6">
			{/* Header */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-2 sm:gap-4">
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
							<h1 className="text-2xl sm:text-3xl font-bold">
								{user.firstname} {user.lastname}
							</h1>
							<Badge
								variant="secondary"
								className={cn(roleColors[user.role as ROLE])}
							>
								{user.role}
							</Badge>
						</div>
						<p className="text-sm text-muted-foreground">User Profile</p>
					</div>
				</div>
				<Button variant="destructive" size="sm" onClick={handleDelete}>
					<Trash2 className="h-4 w-4 mr-2" />
					Delete User
				</Button>
			</div>

			{/* Main Content */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* User Information */}
				<div className="lg:col-span-2 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Contact Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center gap-2">
								<Mail className="h-4 w-4 text-muted-foreground" />
								<span>{user.email}</span>
							</div>
							<div className="flex items-center gap-2">
								<Phone className="h-4 w-4 text-muted-foreground" />
								<span>{user.phoneNumber}</span>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Account Details</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center gap-2">
								<Shield className="h-4 w-4 text-muted-foreground" />
								<span>Role: {user.role}</span>
							</div>
							<div className="flex items-center gap-2">
								<Calendar className="h-4 w-4 text-muted-foreground" />
								<span>
									Member since: {new Date(user.createdAt).toLocaleDateString()}
								</span>
							</div>
							<div className="flex items-center gap-2">
								<Clock className="h-4 w-4 text-muted-foreground" />
								<span>
									Last active: {new Date(user.lastSeen).toLocaleDateString()}
								</span>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Status and Actions */}
				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Status</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<span>Account Status</span>
								<Badge
									variant="secondary"
									className={cn(
										user.isActive
											? "bg-green-500/10 text-green-500"
											: "bg-gray-500/10 text-gray-500"
									)}
								>
									{user.isActive ? "Active" : "Inactive"}
								</Badge>
							</div>
							<div className="flex items-center justify-between">
								<span>Online Status</span>
								<Badge
									variant="secondary"
									className={cn(
										user.isOnline
											? "bg-green-500/10 text-green-500"
											: "bg-gray-500/10 text-gray-500"
									)}
								>
									{user.isOnline ? "Online" : "Offline"}
								</Badge>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Actions</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-2 gap-2">
								<Button
									variant="outline"
									onClick={() => handleDutyChange("duty")}
									className="w-full"
								>
									Mark On Duty
								</Button>
								<Button
									variant="outline"
									onClick={() => handleDutyChange("remove-duty")}
									className="w-full"
								>
									Remove from Duty
								</Button>
								<Button
									variant="outline"
									onClick={() => handleDutyChange("leave")}
									className="w-full"
								>
									Mark On Leave
								</Button>
								<Button
									variant="outline"
									onClick={() => handleDutyChange("remove-leave")}
									className="w-full"
								>
									Remove from Leave
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
