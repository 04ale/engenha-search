import { useNavigate } from "react-router-dom"
import { FileBadge } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { EngineerProps } from "@/types/engenheiro"
import { useEffect } from "react"

export function EngineerCard({ engineer }: { engineer: EngineerProps }) {
    const nav = useNavigate()
    useEffect(() => {
        console.log(engineer)
    }, [])
    return (
        <div className="group relative bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:bg-card/80 hover:-translate-y-1">
            <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4 w-full">
                    <div className="relative shrink-0">
                        <img
                            src={engineer.avatar_url}
                            alt={engineer.nome}
                            className="h-16 w-16 rounded-xl object-cover shadow-sm bg-muted"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors truncate">{engineer.nome}</h3>

                        <div className="flex flex-col gap-1.5 mt-2">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <FileBadge className="h-3.5 w-3.5" />
                                <span>CREA: {engineer.crea}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <div className="h-3.5 w-3.5 rounded-full bg-primary/20 flex items-center justify-center">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                </div>
                                <span>Itens executados: {engineer.acervo_itens?.length || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border/50 flex gap-3">
                <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => nav(`/engineer/${engineer.id}`)}
                >
                    Ver Perfil
                </Button>
            </div>
        </div>
    )
}
