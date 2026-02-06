import { useEffect, useState } from "react"
import { MultiSelect, type Option } from "@/components/ui/multi-select"
import { ibgeService, type IBGEMunicipio } from "@/service/ibgeservice"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface SidebarFilterProps {
    onFilterChange: (filters: { ufs: string[]; cidades: string[] }) => void
    filters?: { ufs?: string[]; cidades?: string[] }
}

export function SidebarFilter({ onFilterChange, filters = { ufs: [], cidades: [] } }: SidebarFilterProps) {
    const [ufs, setUfs] = useState<Option[]>([])
    const [cities, setCities] = useState<Option[]>([])

    // Load UFs on mount
    useEffect(() => {
        ibgeService.getEstados().then((data) => {
            const options = data.map(uf => ({
                label: `${uf.nome} (${uf.sigla})`,
                value: uf.sigla
            }))
            setUfs(options)
        })
    }, [])

    // Load Cities when URL UFs change
    useEffect(() => {
        if (!filters.ufs || filters.ufs.length === 0) {
            setCities([])
            return
        }

        const fetchCities = async () => {
            let allCities: IBGEMunicipio[] = []

            const promises = filters.ufs!.map((uf: string) => ibgeService.getMunicipios(uf))
            const results = await Promise.all(promises)

            results.forEach((cityList: IBGEMunicipio[]) => {
                allCities = [...allCities, ...cityList]
            })

            allCities.sort((a, b) => a.nome.localeCompare(b.nome))

            const cityOptions = allCities.map(city => ({
                label: city.nome,
                value: city.nome
            }))

            setCities(cityOptions)
        }

        fetchCities()
    }, [filters.ufs]) // Depend only on the prop

    const handleUfChange = (newUfs: string[]) => {
        // If we clear UFs, we must clear cities too because they belong to UFs
        const newCities = newUfs.length === 0 ? [] : filters.cidades

        onFilterChange({
            ufs: newUfs,
            cidades: newCities || []
        })
    }

    const handleCityChange = (newCities: string[]) => {
        onFilterChange({
            ufs: filters.ufs || [],
            cidades: newCities
        })
    }

    const handleClear = () => {
        onFilterChange({
            ufs: [],
            cidades: []
        })
    }

    return (
        <div className="w-full md:w-64 space-y-6 animate-in slide-in-from-left-4 duration-500">
            <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-5 space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Filtros</h3>
                    {(filters.ufs && filters.ufs.length > 0 || filters.cidades && filters.cidades.length > 0) && (
                        <Button variant="ghost" size="sm" onClick={handleClear} className="h-8 px-2 text-muted-foreground hover:text-primary">
                            Limpar
                        </Button>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Estado</Label>
                        <MultiSelect
                            options={ufs}
                            selected={filters.ufs || []}
                            onChange={handleUfChange}
                            placeholder="Selecione estados..."
                            searchPlaceholder="Buscar estado..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Cidade</Label>
                        <MultiSelect
                            options={cities}
                            selected={filters.cidades || []}
                            onChange={handleCityChange}
                            placeholder="Selecione cidades..."
                            searchPlaceholder="Buscar cidade..."
                            className={cities.length === 0 ? "opacity-50 pointer-events-none" : ""}
                        />
                        {(!filters.ufs || filters.ufs.length === 0) && (
                            <p className="text-xs text-muted-foreground">Selecione um estado primeiro</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
