import { Search as SearchIcon, MapPin } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ibgeService, type IBGEUF, type IBGEMunicipio } from "@/service/ibgeservice"

export function SearchBar() {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    // Location State
    const [ufs, setUfs] = useState<IBGEUF[]>([])
    const [cities, setCities] = useState<IBGEMunicipio[]>([])
    const [selectedUf, setSelectedUf] = useState<string>("")
    const [selectedCity, setSelectedCity] = useState<string>("")

    // Load UFs
    useEffect(() => {
        ibgeService.getEstados().then(setUfs)
    }, [])

    // Load Cities when UF changes
    useEffect(() => {
        if (selectedUf) {
            ibgeService.getMunicipios(selectedUf).then((data) => {
                // Sort cities alphabetically
                const sortedCities = data.sort((a, b) => a.nome.localeCompare(b.nome));
                setCities(sortedCities);
            })
        } else {
            setCities([])
        }
        setSelectedCity("") // Reset city when UF changes
    }, [selectedUf])

    const handleSearch = () => {
        const params = new URLSearchParams()

        if (query.trim()) params.set("q", query)
        if (selectedUf) params.set("ufs", selectedUf)
        if (selectedCity) params.set("cidades", selectedCity)

        navigate(`/results?${params.toString()}`)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <div className="w-full max-w-3xl mt-12 relative animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 z-20 flex flex-col items-center gap-6">

            {/* Main Search Bar */}
            <div className="w-full relative">
                {/* Glow Effect behind search */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

                <div className="relative flex items-center bg-card/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2 gap-2">
                    <div className="pl-4 text-muted-foreground">
                        <SearchIcon className="h-6 w-6" />
                    </div>

                    <input
                        type="text"
                        placeholder="Busque por nome ou CREA"
                        className="flex-1 bg-transparent border-none py-4 text-lg outline-none placeholder:text-muted-foreground/60 text-foreground px-2"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-primary/25 active:scale-95">
                        Buscar
                    </button>
                </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 animate-in slide-in-from-top-2 duration-700 delay-300">
                {/* State Selector */}
                <div className="w-[180px]">
                    <Select value={selectedUf} onValueChange={setSelectedUf}>
                        <SelectTrigger className="h-10 border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md text-foreground hover:bg-black/10 dark:hover:bg-white/10 focus:ring-0 shadow-sm rounded-full px-4 transition-colors">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-3.5 w-3.5 opacity-70" />
                                <SelectValue placeholder="Estado" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            {ufs.map(uf => (
                                <SelectItem key={uf.id} value={uf.sigla}>{uf.sigla}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* City Selector */}
                <div className="w-[220px]">
                    <Select value={selectedCity} onValueChange={setSelectedCity} disabled={!selectedUf}>
                        <SelectTrigger className="h-10 border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md text-foreground hover:bg-black/10 dark:hover:bg-white/10 focus:ring-0 shadow-sm rounded-full px-4 disabled:opacity-50 transition-colors">
                            <SelectValue placeholder="Cidade" />
                        </SelectTrigger>
                        <SelectContent>
                            {cities.map(city => (
                                <SelectItem key={city.id} value={city.nome}>{city.nome}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}
