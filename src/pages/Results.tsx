import Header from "@/components/Header"
import { useCallback, useEffect, useState } from "react"
import { SearchBackground } from "@/components/search/SearchBackground"
import { Button } from "@/components/ui/button"
import { EngineerCard } from "@/components/results/EngineerCard"
import { Skeleton } from "@/components/ui/skeleton"
import { useSearchParams } from "react-router-dom"
import { useEngenheiros } from "@/hooks/useEngenheiros"
import { Return } from "@/components/Return"
import Footer from "@/components/Footer"
import { SidebarFilter } from "@/components/search/SidebarFilter"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"

function Results() {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get("q") || ""

    // Parse filters directly from URL (Single Source of Truth)
    const filters = {
        ufs: searchParams.get("ufs") ? searchParams.get("ufs")!.split(",") : [],
        cidades: searchParams.get("cidades") ? searchParams.get("cidades")!.split(",") : []
    }

    // Update URL when filters change
    const handleFilterChange = useCallback((newFilters: { ufs: string[]; cidades: string[] }) => {
        setCurrentPage(1)

        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev)

            if (newFilters.ufs && newFilters.ufs.length > 0) {
                newParams.set("ufs", newFilters.ufs.join(","))
            } else {
                newParams.delete("ufs")
            }

            if (newFilters.cidades && newFilters.cidades.length > 0) {
                newParams.set("cidades", newFilters.cidades.join(","))
            } else {
                newParams.delete("cidades")
            }

            return newParams
        })
    }, [setSearchParams])

    const { engenheiros, loading } = useEngenheiros(query, filters)

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6

    // Calculate pagination logic
    const totalPages = Math.ceil(engenheiros.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentEngineers = engenheiros.slice(startIndex, endIndex)

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [currentPage])

    return (
        <div className="min-h-screen bg-background relative transition-colors duration-500">
            {/* ... background ... */}
            <div className="fixed inset-0 z-0 opacity-50 pointer-events-none">
                <SearchBackground />
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />

                <main className="flex-1 container mx-auto px-4 py-8">
                    {/* Top Bar / Back Button */}
                    <div className="mb-8">
                        <Return />
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Sidebar Filter */}
                        <aside className="w-full md:w-auto shrink-0 sticky top-24">
                            <SidebarFilter
                                onFilterChange={handleFilterChange}
                                filters={filters}
                            />
                        </aside>

                        <div className="flex-1 w-full space-y-6">
                            <div className="flex flex-col justify-between items-start gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight">Resultados para "{query}"</h1>
                                    <p className="text-muted-foreground">Encontramos <span className="font-semibold text-primary">{engenheiros.length}</span> engenheiros disponíveis</p>
                                </div>
                            </div>

                            {loading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="flex flex-col gap-4 p-5 rounded-2xl border border-border/50 bg-card/50">
                                            <div className="flex gap-4">
                                                <Skeleton className="h-16 w-16 rounded-xl" />
                                                <div className="flex-1 space-y-2">
                                                    <Skeleton className="h-6 w-3/4" />
                                                    <Skeleton className="h-4 w-1/2" />
                                                </div>
                                            </div>
                                            <div className="space-y-2 mt-2">
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-4 w-2/3" />
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-border/50">
                                                <Skeleton className="h-10 w-full rounded-md" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {currentEngineers.length > 0 ? (
                                            currentEngineers.map(eng => (
                                                <EngineerCard key={eng.id || eng.crea} engineer={eng} />
                                            ))
                                        ) : (
                                            <div className="col-span-full py-12 flex flex-col items-center justify-center text-center space-y-4 bg-card/30 rounded-2xl border border-dashed border-border/50">
                                                <div className="p-4 bg-muted rounded-full">
                                                    <div className="h-8 w-8 opacity-50 text-4xl">🔍</div>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg">Nenhum resultado encontrado</h3>
                                                    <p className="text-muted-foreground">Tente ajustar seus filtros ou buscar por outro nome.</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Pagination Controls */}
                                    {totalPages > 1 && (
                                        <div className="flex justify-center mt-8">
                                            <Pagination>
                                                <PaginationContent>
                                                    <PaginationItem>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                                            disabled={currentPage === 1}
                                                            className="gap-1 pl-2.5 bg-background/50 backdrop-blur-sm border-border/50"
                                                        >
                                                            <span>Anterior</span>
                                                        </Button>
                                                    </PaginationItem>

                                                    <div className="text-sm text-muted-foreground mx-4 flex items-center">
                                                        Página {currentPage} de {totalPages}
                                                    </div>

                                                    <PaginationItem>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                                            disabled={currentPage === totalPages}
                                                            className="gap-1 pr-2.5 bg-background/50 backdrop-blur-sm border-border/50"
                                                        >
                                                            <span>Próximo</span>
                                                        </Button>
                                                    </PaginationItem>
                                                </PaginationContent>
                                            </Pagination>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>

        </div>
    )
}

export default Results