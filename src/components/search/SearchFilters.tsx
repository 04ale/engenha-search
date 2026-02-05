import { Zap, HardHat, PenTool, Database, Shield, Briefcase } from "lucide-react"

const categories = [
    { name: "Civil", icon: HardHat, color: "text-orange-500" },
    { name: "Software", icon: Database, color: "text-blue-500" },
    { name: "Elétrica", icon: Zap, color: "text-yellow-500" },
    { name: "Mecânica", icon: PenTool, color: "text-slate-500" },
    { name: "Segurança", icon: Shield, color: "text-green-500" },
    { name: "Consultoria", icon: Briefcase, color: "text-purple-500" },
]

export function SearchFilters() {
    return (
        <div className="mt-8 flex flex-wrap justify-center gap-3 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {categories.map((cat, i) => (
                <button
                    key={cat.name}
                    className="group flex items-center gap-2 px-4 py-2 bg-card/40 backdrop-blur-md hover:bg-card/80 border border-border/50 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95"
                    style={{ animationDelay: `${200 + (i * 50)}ms` }}
                >
                    <cat.icon className={`h-4 w-4 ${cat.color}`} />
                    {cat.name}
                </button>
            ))}
        </div>
    )
}
