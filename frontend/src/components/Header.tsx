import { Link } from "react-router-dom";

export function Header() {
    return (
        <header className="bg-card rounded-xl border border-border p-4 flex flex-col items-center justify-center gap-5 mb-20">
            <h1 className="font-bold text-3xl text-card-foreground">
                Checkpoint : frontend
            </h1>
            <Link to="/" className="font-semibold text-xl text-card-foreground">
                Countries
            </Link>
        </header>
    );
}
