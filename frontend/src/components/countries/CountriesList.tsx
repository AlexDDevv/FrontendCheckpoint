import { useQuery } from "@apollo/client";
import { queryCountries } from "../../api/countries";
import { CountryType } from "../../types";
import CountryCard from "./CountryCard";

export default function CountriesList() {
    const { data: dataCountries } = useQuery<{ countries: CountryType[] }>(
        queryCountries,
        {
            fetchPolicy: "cache-and-network",
        }
    );

    const countries = dataCountries?.countries;

    return (
        <section>
            <h2 className="text-2xl font-medium text-foreground mb-10">
                Liste des pays
            </h2>
            <div className="flex items-center justify-center gap-10 flex-wrap mb-20">
                {countries?.map((country) => (
                    <CountryCard
                        key={country.code}
                        name={country.name}
                        code={country.code}
                        emoji={country.emoji}
                        continent={country.continent}
                    />
                ))}
            </div>
        </section>
    );
}
