import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme/theme-provider"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            variant="ghost"
            size="icon"
            className="group relative h-10 w-10 rounded-full bg-transparent hover:bg-transparent"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title="Alternar tema"
        >
            {/* Sun Icon and Glow */}
            <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 rotate-0 scale-100 dark:-rotate-90 dark:scale-0">
                <Sun className="h-6 w-6 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-all duration-500 group-hover:text-amber-400 group-hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.7)]" />
                {/* Sun Rays Effect */}
                <span className="absolute inset-0 rounded-full bg-amber-400/20 blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>

            {/* Moon Icon and Glow */}
            <span className="absolute inset-0 flex items-center justify-center transition-all duration-500 rotate-90 scale-0 dark:rotate-0 dark:scale-100">
                <Moon className="h-6 w-6 text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)] transition-all duration-500 group-hover:text-indigo-300 group-hover:drop-shadow-[0_0_12px_rgba(129,140,248,0.8)]" />
                {/* Moon Glow Effect */}
                <span className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>

            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}