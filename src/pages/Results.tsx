import Header from "@/components/Header"
import { SearchBackground } from "@/components/search/SearchBackground"
import { EngineerCard, type EngineerProps } from "@/components/results/EngineerCard"
import { SlidersHorizontal, ChevronDown } from "lucide-react"

// Mock Data
const MOCK_ENGINEERS: EngineerProps[] = [
    {
        id: "1",
        nome: "Carlos Ferreira",
        crea: "123456/SP",
        especialidade: "Engenharia Civil",
        email: "carlos.eng@example.com",
        telefone: "(11) 99999-9999",
        avatar_url: "https://github.com/shadcn.png"
    },
    {
        id: "2",
        nome: "Ana Julia Santos",
        crea: "654321/RJ",
        especialidade: "Engenharia Elétrica",
        email: "ana.santos@example.com",
        telefone: "(21) 98888-8888",
        avatar_url: "https://github.com/shadcn.png"
    },
    {
        id: "3",
        nome: "Roberto Almeida",
        crea: "987654/PR",
        especialidade: "Engenharia Mecânica",
        email: "roberto.mec@example.com",
        telefone: "(41) 97777-7777",
        avatar_url: "https://github.com/shadcn.png"
    },
    {
        id: "4",
        nome: "Fernanda Costa",
        crea: "112233/MG",
        especialidade: "Engenharia de Software",
        email: "fernanda.dev@example.com",
        telefone: "(31) 96666-6666",
        avatar_url: "https://github.com/shadcn.png"
    },
    {
        id: "5",
        nome: "Lucas Pereira",
        crea: "445566/RS",
        especialidade: "Engenharia de Segurança",
        email: "lucas.seg@example.com",
        telefone: "(51) 95555-5555",
        avatar_url: "https://github.com/shadcn.png"
    }
]

function Results() {
    return (
        <div className="min-h-screen bg-background relative transition-colors duration-500">
            {/* Reusing background for consistency but maybe tone it down? */}
            <div className="fixed inset-0 z-0 opacity-50 pointer-events-none">
                <SearchBackground />
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />

                <main className="flex-1 container mx-auto px-4 py-8">
                    {/* Top Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Resultados da busca</h1>
                            <p className="text-muted-foreground">Encontramos <span className="font-semibold text-primary">{MOCK_ENGINEERS.length}</span> engenheiros disponíveis</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors">
                                <SlidersHorizontal className="h-4 w-4" />
                                Filtros
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors">
                                Relevância
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar (Desktop) */}
                        <aside className="hidden lg:block space-y-8">
                            {/* Filter Groups */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-foreground">Especialidade</h3>
                                <div className="space-y-2">
                                    {["Civil", "Elétrica", "Mecânica", "Software", "Segurança"].map(label => (
                                        <label key={label} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                                            <input type="checkbox" className="rounded border-muted text-primary focus:ring-primary/20" />
                                            {label}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-semibold text-foreground">Disponibilidade</h3>
                                <div className="space-y-2">
                                    {["Imediata", "Esta semana", "Próximo mês"].map(label => (
                                        <label key={label} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                                            <input type="checkbox" className="rounded border-muted text-primary focus:ring-primary/20" />
                                            {label}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Results Grid */}
                        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {MOCK_ENGINEERS.map(eng => (
                                <EngineerCard key={eng.id} engineer={eng} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Results