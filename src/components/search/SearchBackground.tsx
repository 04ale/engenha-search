export function SearchBackground() {
    return (
        <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen dark:mix-blend-multiply opacity-50 dark:opacity-20 animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] -z-10 mix-blend-screen dark:mix-blend-plus-lighter opacity-40 dark:opacity-10" />
        </>
    )
}
