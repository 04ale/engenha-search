import Header from "@/components/Header"
import { SearchBackground } from "@/components/search/SearchBackground"
import { SearchHero } from "@/components/search/SearchHero"
import { SearchBar } from "@/components/search/SearchBar"
import Footer from "@/components/Footer"

function Home() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-500">
            <SearchBackground />

            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />

                <main className="flex-1 flex flex-col items-center justify-center -mt-16 px-4 py-12">
                    <SearchHero />
                    <SearchBar />
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default Home