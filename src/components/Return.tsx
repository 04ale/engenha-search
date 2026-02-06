import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export function Return() {
    const nav = useNavigate()
    return (
        <button
            onClick={() => nav("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors hover:bg-accent/50 px-3 py-2 rounded-lg -ml-2"
        >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Voltar</span>
        </button>
    )
}