"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    RowSelectionState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatCurrencyToBR, formatDateToBR } from "@/lib/utils"
import { ArrowUpDown, EllipsisVertical, PenIcon, Trash, Settings } from "lucide-react"
import { DeleteTask } from "../actions"
import { useRouter } from "next/navigation"
import { Task } from "@/types/Task"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import BulkStatusModal from "./bulk-status-modal"

type TodoDataTable = {
    data: Task[] | any
    onEdit: (todo: any) => void;
}

export function DataTable({ data, onEdit }: TodoDataTable) {
    const router = useRouter()
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = React.useState("")
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
    const [bulkModalOpen, setBulkModalOpen] = React.useState(false)

    const [projectFilter, setProjectFilter] = React.useState<string>("");
    const [statusFilter, setStatusFilter] = React.useState<string>("second")

    const handleProjectFilterChange = (value: string) => {
        value = value == "All" ? "" : value;
        setProjectFilter(value);
        table.getColumn("project")?.setFilterValue(value);
    };

    const handleStatusFilterChange = (value: string) => {
        value = value == "All" ? "" : value;
        setStatusFilter(value);
        table.getColumn("status")?.setFilterValue(value);
    };

    const handleEditTodo = (todo: any) => {
        onEdit(todo)
    };

    const selectedTaskIds = Object.keys(rowSelection)
            .filter(key => rowSelection[key])
            .map(key => data[parseInt(key)]?._id)
            .filter(Boolean)

    const handleBulkStatusUpdate = () => {
        if (selectedTaskIds.length === 0) {
            return
        }
        setBulkModalOpen(true)
    };

    const handleBulkUpdateSuccess = () => {
        setRowSelection({})
        router.refresh()
    };

    const columns: ColumnDef<Task>[] = [
        {
            id: "select",
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
            enableHiding: false,
        },
        {
            accessorKey: "status",
            header: ({ column }) => {
                return (
                    <Button
                        variant="link"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "priority",
            header: ({ column }) => {
                return (
                    <Button
                        variant="link"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Priority
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "project",
            header: ({ column }) => {
                return (
                    <Button
                        variant="link"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Project Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },

        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="link"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },

        },
        {
            accessorKey: "expectedDelivery",
            header: ({ column }) => {
                return (
                    <Button
                        variant="link"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Expected Delivery
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div>
                    {formatDateToBR(row.getValue("expectedDelivery"))}
                </div>
            ),
        },
        {
            accessorKey: "value",
            header: ({ column }) => {
                return (
                    <Button
                        variant="link"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Value
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div>
                    {formatCurrencyToBR(row.getValue("value"))}
                </div>
            ),
        },
        {
            accessorKey: "payDate",
            header: ({ column }) => {
                return (
                    <Button
                        variant="link"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Pay Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div>
                    {formatDateToBR(row.getValue("payDate"))}
                </div>
            ),
        },
        {
            accessorKey: "_id",
            header: "Options",
            cell: ({ row }) => {
                const data = row.original

                return (
                    <div className="flex flex-row gap-1">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost"><EllipsisVertical /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Task options</DropdownMenuLabel>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={async () => {
                                        await DeleteTask(data._id)
                                        router.refresh()

                                    }}>
                                        <Trash className="mr-2 h-4 w-4" />
                                        <span>Delete</span>
                                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={async () => {
                                        handleEditTodo(data)

                                    }}>
                                        <PenIcon className="mr-2 h-4 w-4" />
                                        <span>Edit</span>
                                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                    </DropdownMenuItem>

                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )
            },
        },
    ]

    const table = useReactTable({
      data,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onRowSelectionChange: setRowSelection,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        sorting,
        columnFilters,
        rowSelection,
      },
      enableRowSelection: true,
    })

    return (
          <div className="md:max-w-full max-w-sm overflow-x-auto flex flex-col gap-5">

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <Input
                placeholder="Filter task name"
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="flex-1"
              />
              
              {selectedTaskIds.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {selectedTaskIds.length} task(s) selected
                  </span>
                  <Button 
                    onClick={handleBulkStatusUpdate}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Update Status
                  </Button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-5">

                    <Select
                        value={projectFilter}
                        onValueChange={(e) => handleProjectFilterChange(e)}
                    >
                        <SelectTrigger id="project">
                        <SelectValue placeholder="Filter by project" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="All">All projects</SelectItem>
                                {Array.from(new Set(data.map((item: any) => item.project))).map((project: any) => (
                                    <>
                                        {project && (
                                            <SelectItem key={project} value={project.toString()}>{project}</SelectItem>   
                                        )}
                                    </>
                                ))}
                        </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Select
                        value={statusFilter}
                        onValueChange={(e) => handleStatusFilterChange(e)}
                    >
                        <SelectTrigger id="project">
                        <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="All">All status</SelectItem>
                                {Array.from(new Set(data.map((item: any) => item.status))).map((status: any) => (
                                    <>
                                        {status && (
                                            <SelectItem key={status} value={status.toString()}>{status}</SelectItem>   
                                        )}
                                    </>
                                ))}
                        </SelectGroup>
                        </SelectContent>
                    </Select>
            </div>

            <div>
              <Table className="min-w-full divide-y divide-gray-200">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {data && table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
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
            <div className="flex items-center justify-end space-x-2 py-4">
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
                    disabled={data && !table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>

            <BulkStatusModal
                open={bulkModalOpen}
                onOpenChange={setBulkModalOpen}
                selectedTasks={selectedTaskIds}
                onSuccess={handleBulkUpdateSuccess}
            />
        </div>
    )
}
