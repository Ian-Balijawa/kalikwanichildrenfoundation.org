import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClients } from "@/hooks/useClients";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Client } from "@/types/api";
import { Building2, Plus, Search } from "lucide-react";

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

export default function ClientsList() {
	const navigate = useNavigate();
	const { clients, isLoading } = useClients();
	const [searchQuery, setSearchQuery] = useState("");

	const filteredClients = clients.filter((client) =>
		Object.values(client).some((value) =>
			String(value).toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	const columns: ColumnDef<Client>[] = [
		{
			accessorKey: "name",
			header: "Name",
			cell: ({ row }) => (
				<div
					className="flex items-center gap-2 cursor-pointer hover:text-primary"
					onClick={() => navigate(`/clients/${row.original.id}`)}
				>
					<Building2 className="h-4 w-4" />
					<span className="font-medium">{row.original.name}</span>
				</div>
			),
		},
		{
			accessorKey: "type",
			header: "Type",
			cell: ({ row }) => (
				<Badge
					variant="secondary"
					className={typeColors[row.original.type] || "bg-gray-500/10 text-gray-500"}
				>
					{row.original.type}
				</Badge>
			),
		},
		{
			accessorKey: "email",
			header: "Email",
		},
		{
			accessorKey: "phoneNumber",
			header: "Phone",
		},
		{
			accessorKey: "address",
			header: "Address",
		},
		{
			accessorKey: "isActive",
			header: "Status",
			cell: ({ row }) => (
				<Badge
					variant="secondary"
					className={
						row.original.isActive
							? "bg-green-500/10 text-green-500"
							: "bg-red-500/10 text-red-500"
					}
				>
					{row.original.isActive ? "Active" : "Inactive"}
				</Badge>
			),
		},
	];

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Clients</h1>
				<Button onClick={() => navigate("/clients/new")}>
					<Plus className="h-4 w-4 mr-2" />
					Add Client
				</Button>
			</div>

			<div className="relative">
				<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
				<Input
					placeholder="Search clients..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="pl-9"
				/>
			</div>

			<DataTable
				columns={columns}
				data={filteredClients}
				isLoading={isLoading}
				enableSelection
			/>
		</div>
	);
}
