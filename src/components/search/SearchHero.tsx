export function SearchHero() {
    return (
        <div className="text-center space-y-6 max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-700 slide-in-from-bottom-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 backdrop-blur-sm mb-4">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Diversos engenheiros cadastrados
            </div>

            <h1 className="text-4xl md:text-6xl/tight font-extrabold tracking-tight text-foreground drop-shadow-sm">
                Encontre o <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">Engenheiro Ideal</span> para o seu projeto
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Conectamos você aos melhores profissionais do mercado.
                Busque por especialidade, localização, nome ou CREA.
            </p>
        </div>
    )
}
