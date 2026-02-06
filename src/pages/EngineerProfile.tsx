import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Return } from "@/components/Return";
import { SearchBackground } from "@/components/search/SearchBackground";
import { FileBadge } from "lucide-react";
import useEngenheiros from "@/hooks/useEngenheiros";
import { AcervoTable } from "@/components/profile/AcervoTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function EngineerProfile() {
    const { id } = useParams();
    const { engineer, loading } = useEngenheiros(id);



    return (
        <div className="min-h-screen bg-background relative transition-colors duration-500">
            <div className="fixed inset-0 z-0 opacity-50 pointer-events-none">
                <SearchBackground />
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />

                <main className="flex-1 container mx-auto px-4 py-8">
                    <div className="mb-8">
                        <Return />
                    </div>

                    {loading ? (
                        <div className="animate-pulse space-y-8">
                            {/* Profile Header Skeleton */}
                            <div className="bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-8 mb-8 shadow-sm">
                                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                                    <Skeleton className="h-32 w-32 rounded-2xl" />
                                    <div className="flex-1 text-center md:text-left space-y-4 w-full">
                                        <div className="space-y-2 flex flex-col items-center md:items-start">
                                            <Skeleton className="h-10 w-3/4 md:w-1/2" />
                                            <Skeleton className="h-6 w-1/3 md:w-1/4" />
                                        </div>
                                        <Skeleton className="h-9 w-40 rounded-xl mx-auto md:mx-0" />
                                    </div>
                                    <div className="flex-1 text-center md:text-left space-y-4 w-full">
                                        <Skeleton className="h-10 w-3/4 md:w-1/2" />
                                        <div className="flex justify-center md:justify-start gap-25">
                                            <Skeleton className="h-9 w-40 rounded-xl mx-auto md:mx-0" />
                                            <Skeleton className="h-9 w-40 rounded-xl mx-auto md:mx-0" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Table Skeleton */}
                            <div className="space-y-6">
                                <Skeleton className="h-8 w-48" />
                                <div className="rounded-xl border border-border/50 bg-card/50 overflow-hidden">
                                    <div className="p-4 space-y-4">
                                        <div className="flex gap-4">
                                            <Skeleton className="h-8 flex-1" />
                                            <Skeleton className="h-8 w-24" />
                                            <Skeleton className="h-8 w-24" />
                                            <Skeleton className="h-8 w-32" />
                                        </div>
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex gap-4">
                                                <Skeleton className="h-12 flex-1" />
                                                <Skeleton className="h-12 w-24" />
                                                <Skeleton className="h-12 w-24" />
                                                <Skeleton className="h-12 w-32" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : engineer ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Profile Header */}
                            <div className="bg-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-8 mb-8 shadow-sm flex max-sm:flex-col">
                                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start w-6/10 max-sm:w-full">
                                    <Avatar className="w-32 h-32 rounded-2xl shadow-lg border-4 border-card">
                                        <AvatarImage
                                            src={engineer.avatar_url}
                                            alt={engineer.nome}
                                            className="object-cover"
                                        />
                                        <AvatarFallback className="text-4xl bg-muted rounded-2xl">
                                            {engineer.nome.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 text-center md:text-left space-y-4">
                                        <div>
                                            <h1 className="text-3xl md:text-4xl font-bold">{engineer.nome}</h1>
                                            <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-muted-foreground">
                                                <FileBadge className="h-5 w-5" />
                                                <span className="text-lg">CREA: {engineer.crea}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                            <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-medium">
                                                {engineer.acervo_itens?.length || 0} Itens Executados
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-4/10 max-sm:w-full max-sm:items-center max-sm:justify-center">
                                    <div className="flex flex-col justify-between items-start gap-4 max-sm:justify-around">
                                        <div>
                                            <h1 className="text-3xl font-bold tracking-tight max-sm:text-center">Áreas de atuação:</h1>
                                        </div>
                                        <div className="flex flex-row justify-between w-full">
                                            <div className="w-1/2">
                                                <h2>Estados:</h2>
                                                {engineer?.locais_atuacao?.map((local) => local.uf).join(", ") || "Não informado"}
                                            </div>
                                            <div className="w-1/2">
                                                <h2>Cidades:</h2>
                                                {engineer?.locais_atuacao?.map((local) => local.cidades).join(", ") || "Não informado"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Acervo Items Table */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold px-2">Itens Executados</h2>
                                {engineer.acervo_itens && engineer.acervo_itens.length > 0 ? (
                                    <AcervoTable data={engineer.acervo_itens} />
                                ) : (
                                    <div className="text-center py-12 text-muted-foreground bg-card/30 rounded-xl border border-dashed border-border">
                                        Nenhum item de acervo registrado.
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            Engenheiro não encontrado.
                        </div>
                    )}
                </main>
                <Footer />
            </div>
        </div>
    );
}
