import { Phone, Mail, FileBadge } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface EngineerProps {
    id: string
    nome: string
    crea: string
    especialidade: string
    email: string
    telefone: string
    avatar_url: string
}

export function EngineerCard({ engineer }: { engineer: EngineerProps }) {
    return (
        <div className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:bg-card/80 hover:-translate-y-1">
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
                        <p className="text-sm text-primary font-medium">{engineer.especialidade}</p>

                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <FileBadge className="h-3.5 w-3.5" />
                            <span>CREA: {engineer.crea}</span>
                        </div>

                        <div className="mt-3 flex flex-col gap-1.5">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <Mail className="h-3.5 w-3.5" />
                                <span className="truncate">{engineer.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <Phone className="h-3.5 w-3.5" />
                                {engineer.telefone}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 pt-4 border-t border-border/50 flex gap-3">
                <Button className="w-full" variant="outline">Ver Perfil</Button>
            </div>
        </div>
    )
}
