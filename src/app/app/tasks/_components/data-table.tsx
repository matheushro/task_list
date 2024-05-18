"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    SortingState,
    getPaginationRowModel,
    useReactTable,
    getFilteredRowModel,
    getSortedRowModel,
  } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatCurrencyToBR, formatDateToBR } from "@/lib/utils"
import { EllipsisVertical, PenIcon, Trash } from "lucide-react"
import { DeleteTask } from "../actions"
import { useRouter } from "next/navigation"



export type Payment = {
    _id: string
    price: number
    priority: "pending" | "processing" | "success" | "failed"
    name: string
    expectedDelivery: string
    payDate: string
  }
  
  type TodoDataTable = {
    data: any[]
    onEdit: (todo: any) => void;
  }
  
  export function DataTable({data, onEdit}: TodoDataTable) {
    const router = useRouter()

    
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const handleEditTodo = (todo: any) => {
        onEdit(todo)
    };

    const columns: ColumnDef<Payment>[] = [
        {
          accessorKey: "priority",
          header: "Prioridade",
        },
        {
          accessorKey: "name",
          header: "Nome",
        },
        {
          accessorKey: "expectedDelivery",
          header: "Data de entrega",
          cell: ({ row }) => (
            <div>
              {formatDateToBR(row.getValue("payDate"))}
            </div>
          ),
        },
        {
          accessorKey: "value",
          header: "Valor",
          cell: ({ row }) => (
            <div>
              {formatCurrencyToBR(row.getValue("value"))}
            </div>
          ),
        },
        {
          accessorKey: "payDate",
          header: "Data de pagamento",
          cell: ({ row }) => (
            <div>
              {formatDateToBR(row.getValue("payDate"))}
            </div>
          ),
        },
        {
          accessorKey: "_id",
          header: "Opções",
          cell: ({ row }) => {
            const data = row.original
      
            return (
            <div className="flex flex-row gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost"><EllipsisVertical /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Opções da task</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={async () => {
                      await DeleteTask(data._id)
                      router.refresh()
      
                    }}>
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Deletar</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={async () => {
                     handleEditTodo(data)
      
                    }}>
                      <PenIcon className="mr-2 h-4 w-4" />
                      <span>Editar</span>
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
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <>
        
        <div className="rounded-md border bg-white">
          <Table >
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
                Anterior
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={data && !table.getCanNextPage()}
            >
                Próximo
            </Button>
        </div>
    </>

  )
}