import Header from "@/components/Header"
import { SearchBackground } from "@/components/search/SearchBackground"
import { SearchHero } from "@/components/search/SearchHero"
import { SearchBar } from "@/components/search/SearchBar"
import { SearchFilters } from "@/components/search/SearchFilters"

function Home() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-500">
            <SearchBackground />

            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />

                <main className="flex-1 flex flex-col items-center justify-center -mt-16 px-4 py-12">
                    <SearchHero />
                    <SearchBar />
                    <SearchFilters />
                </main>

                <footer className="w-full py-6 text-center text-muted-foreground text-sm relative z-10">
                    <p>&copy; 2026 Engenha Search. DevTech Softwares. Todos os direitos reservados.</p>
                </footer>
            </div>
        </div>
    )
}

export default Home