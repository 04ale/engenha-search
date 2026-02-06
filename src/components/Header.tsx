import { ModeToggle } from "./theme/mode-toggle";
import { Label } from "./ui/label";

function Header() {
    return (
        <div className="flex justify-around w-full bg-background/80 border-b border-border/50 h-16 items-center">
            <Label className="text-2xl font-bold text-foreground">Engenha Search</Label>
            <ModeToggle />
        </div>
    )
}

export default Header