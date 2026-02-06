function Footer() {
    return (
        <div className="w-full py-6 flex flex-col items-center justify-center gap-4 text-center text-muted-foreground text-sm relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">

            <div className="flex items-center gap-1.5">
                <span className="font-semibold">Você também é engenheiro e quer usufruir do nosso sistema?</span>
                <a
                    href="https://engenha-ai.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                >
                    <span className="font-semibold underline underline-offset-4 hover:text-primary/80">clique aqui!</span>
                </a>
            </div>
            <p className="text-xs opacity-50">&copy; 2026 Engenha Search. DevTech Softwares. Todos os direitos reservados.</p>
        </div>
    )
}

export default Footer