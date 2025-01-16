import { useState } from 'react';
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	type SortingState,
	getSortedRowModel,
	type RowSelectionState,
} from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLoading?: boolean;
	enableSelection?: boolean;
	onSelectedRowsChange?: (rows: TData[]) => void;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	isLoading,
	enableSelection,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const [pageSize, setPageSize] = useState(10);

	const selectionColumn: ColumnDef<TData>[] = enableSelection
		? [
				{
					id: 'select',
					header: ({ table }) => (
						<Checkbox
							checked={table.getIsAllPageRowsSelected()}
							onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
							aria-label="Select all"
						/>
					),
					cell: ({ row }) => (
						<Checkbox
							checked={row.getIsSelected()}
							onCheckedChange={(value) => row.toggleSelected(!!value)}
							aria-label="Select row"
						/>
					),
					enableSorting: false,
				},
			]
		: [];

	const table = useReactTable({
		data,
		columns: [...selectionColumn, ...columns],
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			rowSelection,
			pagination: { pageSize, pageIndex: 0 },
		},
	});

	const exportToCSV = () => {
		const selectedRows = table.getSelectedRowModel().rows;
		const rows = selectedRows.length > 0 ? selectedRows : table.getRowModel().rows;
		const headers = columns
			.filter((col) => col.id !== 'actions')
			.map((col) => (typeof col.header === 'string' ? col.header : col.id));

		const csvData = rows.map((row) =>
			columns
				.filter((col) => col.id !== 'actions')
				.map((col) => {
					const value = row.getValue(col.id!);
					return typeof value === 'object' ? JSON.stringify(value) : value;
				})
		);

		const csvContent =
			'data:text/csv;charset=utf-8,' +
			[headers.join(','), ...csvData.map((row) => row.join(','))].join('\n');

		const encodedUri = encodeURI(csvContent);
		const link = document.createElement('a');
		link.setAttribute('href', encodedUri);
		link.setAttribute('download', 'export.csv');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	if (isLoading) {
		return (
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<Skeleton className="h-8 w-[200px]" />
					<Skeleton className="h-8 w-[100px]" />
				</div>
				<div className="rounded-lg border">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map(() => (
										<TableHead key={Math.random()}>
											<Skeleton className="h-4 w-[100px]" />
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{Array.from({ length: 5 }).map((_, i) => (
								<TableRow key={i}>
									{Array.from({ length: columns.length }).map((_, j) => (
										<TableCell key={j}>
											<Skeleton className="h-4 w-[100px]" />
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="text-sm text-muted-foreground">
						{table.getFilteredSelectedRowModel().rows.length} of{' '}
						{table.getFilteredRowModel().rows.length} row(s) selected
					</span>
					<Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
						<SelectTrigger className="w-[120px]">
							<SelectValue placeholder="Show" />
						</SelectTrigger>
						<SelectContent>
							{[10, 20, 30, 40, 50].map((size) => (
								<SelectItem key={size} value={size.toString()}>
									Show {size}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<Button variant="outline" size="sm" onClick={exportToCSV}>
					<Download className="mr-2 h-4 w-4" />
					Export
				</Button>
			</div>

			<div className="rounded-lg border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder ? null : (
											<div
												className={cn(
													'flex items-center gap-2',
													header.column.getCanSort() && 'cursor-pointer select-none'
												)}
												onClick={header.column.getToggleSortingHandler()}
											>
												{flexRender(header.column.columnDef.header, header.getContext())}
												{{
													asc: <ChevronUp className="h-4 w-4" />,
													desc: <ChevronDown className="h-4 w-4" />,
												}[header.column.getIsSorted() as string] ?? null}
											</div>
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">
					Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
