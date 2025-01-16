import { useUsers } from "@/hooks/useUsers";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROLE } from "@/types/api";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface UserFormData {
	firstname: string;
	lastname: string;
	email: string;
	phoneNumber: string;
	role: ROLE;
}

const initialFormData: UserFormData = {
	firstname: "",
	lastname: "",
	email: "",
	phoneNumber: "",
	role: ROLE.SUPPORT,
};

export default function UsersNew() {
	const navigate = useNavigate();
	const { createUser, isCreating } = useUsers();
	const [formData, setFormData] = useState<UserFormData>(initialFormData);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Basic validation
		if (!formData.firstname || !formData.lastname || !formData.email) {
			toast.error("Please fill in all required fields");
			return;
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			toast.error("Please enter a valid email address");
			return;
		}

		try {
			await createUser(formData);
			toast.success("User created successfully");
			navigate("/users");
		} catch (error) {
			toast.error("Failed to create user");
		}
	};

	return (
		<div className="p-4 md:p-6 space-y-6">
			{/* Header */}
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
					<h1 className="text-2xl sm:text-3xl font-bold">Add New User</h1>
					<p className="text-sm text-muted-foreground">Create a new user account</p>
				</div>
			</div>

			{/* Form */}
			<Card>
				<CardHeader>
					<CardTitle>User Information</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<label htmlFor="firstname" className="text-sm font-medium">
									First Name *
								</label>
								<Input
									id="firstname"
									value={formData.firstname}
									onChange={(e) =>
										setFormData({ ...formData, firstname: e.target.value })
									}
									placeholder="Enter first name"
									required
								/>
							</div>
							<div className="space-y-2">
								<label htmlFor="lastname" className="text-sm font-medium">
									Last Name *
								</label>
								<Input
									id="lastname"
									value={formData.lastname}
									onChange={(e) =>
										setFormData({ ...formData, lastname: e.target.value })
									}
									placeholder="Enter last name"
									required
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label htmlFor="email" className="text-sm font-medium">
								Email Address *
							</label>
							<Input
								id="email"
								type="email"
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
								placeholder="Enter email address"
								required
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="phone" className="text-sm font-medium">
								Phone Number
							</label>
							<Input
								id="phone"
								type="tel"
								value={formData.phoneNumber}
								onChange={(e) =>
									setFormData({ ...formData, phoneNumber: e.target.value })
								}
								placeholder="Enter phone number"
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="role" className="text-sm font-medium">
								Role *
							</label>
							<Select
								value={formData.role}
								onValueChange={(value) =>
									setFormData({ ...formData, role: value as ROLE })
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select role" />
								</SelectTrigger>
								<SelectContent>
									{Object.values(ROLE).map((role) => (
										<SelectItem key={role} value={role}>
											{role}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="flex justify-end gap-4">
							<Button
								type="button"
								variant="outline"
								onClick={() => navigate("/users")}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isCreating}>
								{isCreating ? "Creating..." : "Create User"}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
