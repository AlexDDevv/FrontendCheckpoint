import { Link } from "react-router-dom";
import { CountryType } from "../../types";

export default function CountryCard({
    name,
    code,
    emoji,
    continent,
}: CountryType) {
    return (
        <div className="bg-card flex-col items-center justify-center text-center rounded-lg border border-border p-4 cursor-pointer transition-all duration-200 ease-in-out hover:border-primary hover:scale-105 w-fit flex-1">
            <Link to={`/countries/${code}`}>
                <div>
                    <div className="flex items-center justify-center gap-5">
                        <h3 className="text-card-foreground">{name}</h3>
                        <span className="text-card-foreground">{code}</span>
                    </div>
                    <div className="text-card-foreground">{emoji}</div>
                </div>
                <p className="text-card-foreground">{continent.name}</p>
            </Link>
        </div>
    );
}
