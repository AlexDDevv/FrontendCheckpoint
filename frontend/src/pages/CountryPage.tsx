import { useQuery } from "@apollo/client";
import { CountryType } from "../types";
import { queryCountry } from "../api/country";
import { useParams } from "react-router-dom";

export default function CountryPage() {
    const param = useParams<{ code: string }>();
    const code = param.code;

    const { data: countryData, error } = useQuery<{ country: CountryType }>(
        queryCountry,
        {
            variables: { code },
            skip: !code,
        }
    );

    if (error) return <p>Erreur : {error.message}</p>;
    if (!countryData || !countryData.country) return <p>Pays non trouvé</p>;

    const country = countryData.country;

    return (
        <section className="flex-col items-center justify-center text-center">
            <div className="text-foreground">{country.emoji}</div>
            <div>
                <h2 className="text-foreground text-2xl font-bold">
                    Name : {country.name} ({country.code})
                </h2>
                <p className="text-foreground font-medium">
                    Continent : {country.continent.name}
                </p>
            </div>
        </section>
    );
}
