"use client"

import * as React from "react"
import {
    type ColumnDef,
    type SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { AcervoItemProps } from "@/types/engenheiro"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Pagination, PaginationContent, PaginationItem } from "../ui/pagination"

export const columns: ColumnDef<AcervoItemProps>[] = [
    {
        accessorKey: "categoria",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="pl-0 hover:bg-transparent"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Categoria
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="text-left">{row.getValue("categoria") || "-"}</div>,
    },
    {
        accessorKey: "descricao",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="pl-0 hover:bg-transparent"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Descrição
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="font-medium text-left">{row.getValue("descricao")}</div>,
    },

    {
        accessorKey: "quantidade",
        header: ({ column }) => {
            return (
                <div className="text-right w-full">
                    <Button
                        variant="ghost"
                        className="pr-0 hover:bg-transparent"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Qtd.
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("quantidade"))
            const formatted = new Intl.NumberFormat("pt-BR").format(amount)
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "unidade",
        header: () => <div className="text-center">Unidade</div>,
        cell: ({ row }) => <div className="text-center">{row.getValue("unidade")}</div>,
    },
]

interface AcervoTableProps {
    data: AcervoItemProps[]
}

export function AcervoTable({ data }: AcervoTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 6,
    })

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            sorting,
            pagination,
        },
    })

    return (
        <div className="space-y-4">
            <div className="rounded-2xl border border-border/50 overflow-hidden bg-card/40 backdrop-blur-sm">
                <Table>
                    <TableHeader className="bg-muted/30">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-border/50 hover:bg-transparent">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-muted-foreground font-medium h-10">
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
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="border-border/50 hover:bg-muted/30 transition-colors"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-3">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Nenhum item encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {data.length > 5 && (
                <div className="border-t border-border/50 pt-4 px-2">
                    <Pagination>
                        <PaginationContent className="w-full justify-between">
                            <PaginationItem>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    className="gap-1 pl-2.5 bg-background/50 backdrop-blur-sm border-border/50"
                                >
                                    <span className="sr-only">Anterior</span>
                                    <span>Anterior</span>
                                </Button>
                            </PaginationItem>

                            <div className="text-xs text-muted-foreground font-medium">
                                Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                            </div>

                            <PaginationItem>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                    className="gap-1 pr-2.5 bg-background/50 backdrop-blur-sm border-border/50"
                                >
                                    <span>Próximo</span>
                                    <span className="sr-only">Próximo</span>
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    )
}