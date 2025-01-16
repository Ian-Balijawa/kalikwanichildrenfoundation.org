import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClients } from "@/hooks/useClients";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

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

type FormData = {
	name: string;
	email: string;
	phoneNumber: string;
	address: string;
	type: string;
};

const initialFormData: FormData = {
	name: "",
	email: "",
	phoneNumber: "",
	address: "",
	type: "",
};

export default function ClientsNew() {
	const navigate = useNavigate();
	const { createClient } = useClients();
	const [formData, setFormData] = useState<FormData>(initialFormData);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			// Validate required fields
			if (!formData.name || !formData.email || !formData.type) {
				toast.error("Please fill in all required fields");
				return;
			}

			// Validate email format
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(formData.email)) {
				toast.error("Please enter a valid email address");
				return;
			}

			await createClient(formData);
			toast.success("Client created successfully");
			navigate("/clients");
		} catch (error) {
			toast.error("Failed to create client");
		}
	};

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center gap-4">
				<Button variant="ghost" size="icon" onClick={() => navigate("/clients")}>
					<ArrowLeft className="h-4 w-4" />
				</Button>
				<h1 className="text-2xl font-semibold">New Client</h1>
			</div>

			<Card>
				<form onSubmit={handleSubmit} className="p-6 space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<label htmlFor="name" className="text-sm font-medium">
								Name <span className="text-red-500">*</span>
							</label>
							<Input
								id="name"
								value={formData.name}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, name: e.target.value }))
								}
								placeholder="Enter client name"
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="type" className="text-sm font-medium">
								Type <span className="text-red-500">*</span>
							</label>
							<Select
								value={formData.type}
								onValueChange={(value) =>
									setFormData((prev) => ({ ...prev, type: value }))
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select client type" />
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
							<label htmlFor="email" className="text-sm font-medium">
								Email <span className="text-red-500">*</span>
							</label>
							<Input
								id="email"
								type="email"
								value={formData.email}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, email: e.target.value }))
								}
								placeholder="Enter email address"
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="phoneNumber" className="text-sm font-medium">
								Phone Number
							</label>
							<Input
								id="phoneNumber"
								value={formData.phoneNumber}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										phoneNumber: e.target.value,
									}))
								}
								placeholder="Enter phone number"
							/>
						</div>

						<div className="space-y-2 md:col-span-2">
							<label htmlFor="address" className="text-sm font-medium">
								Address
							</label>
							<Input
								id="address"
								value={formData.address}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, address: e.target.value }))
								}
								placeholder="Enter address"
							/>
						</div>
					</div>

					<div className="flex justify-end gap-2 pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => navigate("/clients")}
						>
							Cancel
						</Button>
						<Button type="submit">Create Client</Button>
					</div>
				</form>
			</Card>
		</div>
	);
}
