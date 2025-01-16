import { useDemands } from "@/hooks/useDemands";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { DemandStatus } from "@/types/enums";
import { cn } from "@/lib/utils";
import { type ColumnDef } from "@tanstack/react-table";
import { type Demand } from "@/types/api";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const statusColors: Record<DemandStatus, string> = {
	[DemandStatus.SOLUTION]: "bg-blue-500/10 text-blue-500",
	[DemandStatus.COMMERCIALS]: "bg-purple-500/10 text-purple-500",
	[DemandStatus.BUSINESS_APPROVAL]: "bg-orange-500/10 text-orange-500",
	[DemandStatus.DEVELOPMENT]: "bg-yellow-500/10 text-yellow-500",
	[DemandStatus.SHELF_READY]: "bg-green-500/10 text-green-500",
	[DemandStatus.SIT]: "bg-cyan-500/10 text-cyan-500",
	[DemandStatus.UAT]: "bg-pink-500/10 text-pink-500",
	[DemandStatus.CLOSED]: "bg-gray-500/10 text-gray-500",
};

const columns: ColumnDef<Demand>[] = [
	{
		accessorKey: "title",
		header: "Title",
		cell: ({ row }) => (
			<div>
				<Link
					to={`/demands/${row.original.id}`}
					className="font-medium text-primary hover:underline"
				>
					{row.getValue("title")}
				</Link>
				<p className="text-sm text-muted-foreground line-clamp-1">
					{row.original.demandSummary}
				</p>
			</div>
		),
	},
	{
		accessorKey: "client",
		header: "Client",
		cell: ({ row }) => (
			<div className="flex flex-col">
				<span className="font-medium">{row.original.client.name}</span>
				<span className="text-xs text-muted-foreground">{row.original.departmentName}</span>
			</div>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const status = row.getValue("status") as DemandStatus;
			return (
				<Badge variant="secondary" className={cn("font-normal", statusColors[status])}>
					{status}
				</Badge>
			);
		},
	},
	{
		accessorKey: "businessOwner",
		header: "Business Owner",
	},
	{
		accessorKey: "releaseMonth",
		header: "Release Month",
		cell: ({ row }) => row.getValue("releaseMonth") || "Not scheduled",
	},
];

export default function DemandsList() {
	const { demands, isLoading } = useDemands({});
	const [searchQuery, setSearchQuery] = useState("");

	const filteredDemands = demands.filter((demand) => {
		const searchContent = [
			demand.title,
			demand.demandSummary,
			demand.client.name,
			demand.departmentName,
			demand.status,
			demand.businessOwner,
			demand.releaseMonth,
		]
			.filter(Boolean)
			.join(" ")
			.toLowerCase();

		return searchContent.includes(searchQuery.toLowerCase());
	});

	return (
		<div className="p-6 space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">Demands</h1>
					<p className="text-muted-foreground">Track and manage all project demands</p>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm">
						<Filter className="h-4 w-4 mr-2" />
						Filter
					</Button>
					<Button asChild>
						<Link to="/demands/new">
							<PlusCircle className="h-4 w-4 mr-2" />
							New Demand
						</Link>
					</Button>
				</div>
			</div>

			<div className="flex items-center gap-2">
				<Input
					placeholder="Search demands..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="max-w-sm"
				/>
			</div>

			<DataTable
				columns={columns}
				data={filteredDemands}
				isLoading={isLoading}
				enableSelection
			/>
		</div>
	);
}
