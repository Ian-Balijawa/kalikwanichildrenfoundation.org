import { useUsers } from "@/hooks/useUsers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ROLE } from "@/types/api";
import { cn } from "@/lib/utils";
import { Search, UserPlus } from "lucide-react";

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

export default function UsersList() {
	const navigate = useNavigate();
	const { users, isLoading } = useUsers();
	const [searchQuery, setSearchQuery] = useState("");

	// Filter users based on search query
	const filteredUsers = users?.filter((user) => {
		const searchTerm = searchQuery.toLowerCase();
		return (
			user.firstname.toLowerCase().includes(searchTerm) ||
			user.lastname.toLowerCase().includes(searchTerm) ||
			user.email.toLowerCase().includes(searchTerm) ||
			user.role.toLowerCase().includes(searchTerm)
		);
	});

	return (
		<div className="p-4 md:p-6 space-y-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row gap-4 justify-between">
				<div className="space-y-1">
					<h1 className="text-2xl md:text-3xl font-bold">Users</h1>
					<p className="text-sm text-muted-foreground">
						Manage and monitor user accounts
					</p>
				</div>
				<Button onClick={() => navigate("/users/new")}>
					<UserPlus className="h-4 w-4 mr-2" />
					Add User
				</Button>
			</div>

			{/* Search and Filters */}
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search users..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-9"
					/>
				</div>
			</div>

			{/* Users List */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{filteredUsers?.map((user) => (
					<div
						key={user.id}
						className="border rounded-lg p-4 space-y-4 hover:bg-muted/50 cursor-pointer transition-colors"
						onClick={() => navigate(`/users/${user.id}`)}
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
									{user.firstname[0]}
									{user.lastname[0]}
								</div>
								<div>
									<div className="font-medium">
										{user.firstname} {user.lastname}
									</div>
									<div className="text-sm text-muted-foreground">
										{user.email}
									</div>
								</div>
							</div>
							<Badge
								variant="secondary"
								className={cn(roleColors[user.role as ROLE])}
							>
								{user.role}
							</Badge>
						</div>
						<div className="flex items-center justify-between text-sm text-muted-foreground">
							<div className="flex items-center gap-2">
								<div
									className={cn(
										"h-2 w-2 rounded-full",
										user.isOnline ? "bg-green-500" : "bg-gray-300"
									)}
								/>
								{user.isOnline ? "Online" : "Offline"}
							</div>
							<div>Last seen: {new Date(user.lastSeen).toLocaleDateString()}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
