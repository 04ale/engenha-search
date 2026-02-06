import { Search as SearchIcon } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function SearchBar() {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/results?q=${encodeURIComponent(query)}`)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <div className="w-full max-w-3xl mt-12 relative animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            {/* Glow Effect behind search */}
            <div className="absolute -inset-1 bg-linear-to-r from-primary to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative flex items-center bg-card/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden group focus-within:ring-2 focus-within:ring-primary/50 transition-all duration-300">
                <div className="pl-6 text-muted-foreground group-focus-within:text-primary transition-colors">
                    <SearchIcon className="h-6 w-6" />
                </div>
                <input
                    type="text"
                    placeholder="Busque pelo nome"
                    className="w-full bg-transparent border-none px-4 py-6 text-lg outline-none placeholder:text-muted-foreground/60 text-foreground"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div className="pr-4 flex items-center gap-2">
                    <button
                        onClick={handleSearch}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-primary/25 active:scale-95">
                        Buscar
                    </button>
                </div>
            </div>
        </div>
    )
}
