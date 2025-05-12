import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { addCountry } from "../api/addCountry";
import { ContinentType } from "../types";
import { queryContinents } from "../api/continents";
import clsx from "clsx";
import { queryCountries } from "../api/countries";

export default function CountryForm() {
    const [name, setName] = useState("");
    const [emoji, setEmoji] = useState("");
    const [code, setCode] = useState("");
    const [continent, setContinent] = useState<number>();
    const [error, setError] = useState<boolean>(false);

    const { data: dataContinents } = useQuery<{ continents: ContinentType[] }>(
        queryContinents,
        {
            fetchPolicy: "cache-and-network",
        }
    );

    const continents = dataContinents?.continents;

    const [doCreateCountry] = useMutation(addCountry, {
        refetchQueries: [queryCountries],
    });

    const doSubmit = async () => {
        const requiredFields = [name, emoji, code, continent];

        const isFormValid = requiredFields.every(
            (field) => field && (Array.isArray(field) ? field.length > 0 : true)
        );

        if (!isFormValid) {
            setError(true);
            return;
        }

        try {
            await doCreateCountry({
                variables: {
                    data: {
                        name,
                        emoji,
                        code,
                        continent: { id: continent },
                    },
                },
            });
            setError(false);
        } catch (e: any) {
            console.error(e.message);
            setError(true);
        }
    };

    return (
        <>
            <section className="bg-card border-border mx-auto max-w-lg rounded-xl border px-6 py-5">
                <h4 className="text-card-foreground font-title mb-7 text-center text-2xl font-bold">
                    Add a country
                </h4>
                <form
                    className="mb-7 flex flex-col gap-10"
                    onSubmit={(e) => {
                        e.preventDefault();
                        doSubmit();
                    }}
                >
                    <div className="flex w-full flex-col justify-center gap-5">
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="name"
                                className="text-card-foreground text-sm"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Add a country name..."
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setError(false);
                                }}
                                className={clsx(
                                    "bg-input text-accent-foreground focus:outline-ring rounded-lg p-3 text-xs placeholder:italic placeholder:opacity-85 focus:outline-2",
                                    error &&
                                        "border-destructive outline-destructive border"
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="emoji"
                                className="text-card-foreground text-sm"
                            >
                                Emoji
                            </label>
                            <input
                                id="emoji"
                                type="emoji"
                                placeholder="Ajouter un emoji..."
                                value={emoji}
                                onChange={(e) => {
                                    setEmoji(e.target.value);
                                    setError(false);
                                }}
                                className={clsx(
                                    "bg-input text-accent-foreground focus:outline-ring rounded-lg p-3 text-xs placeholder:italic placeholder:opacity-85 focus:outline-2",
                                    error &&
                                        "border-destructive outline-destructive border"
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="code"
                                className="text-card-foreground text-sm"
                            >
                                Code
                            </label>
                            <input
                                id="code"
                                type="text"
                                placeholder="Ajouter un code..."
                                value={code}
                                onChange={(e) => {
                                    setCode(e.target.value);
                                    setError(false);
                                }}
                                className={clsx(
                                    "bg-input text-accent-foreground focus:outline-ring rounded-lg p-3 text-xs placeholder:italic placeholder:opacity-85 focus:outline-2",
                                    error &&
                                        "border-destructive outline-destructive border"
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="continent"
                                className="text-card-foreground text-sm"
                            >
                                Continent
                            </label>
                            <select
                                id="continent"
                                value={continent}
                                onChange={(e) => {
                                    setContinent(Number(e.target.value));
                                    setError(false);
                                }}
                                className={clsx(
                                    "bg-input text-accent-foreground focus:outline-ring rounded-lg p-3 text-xs placeholder:italic placeholder:opacity-85 focus:outline-2",
                                    error &&
                                        "border-destructive outline-destructive border"
                                )}
                            >
                                <option value="">Select a continent...</option>
                                {continents?.map((continent) => (
                                    <option
                                        key={continent.id}
                                        value={continent.id}
                                    >
                                        {continent.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button
                        className="bg-primary cursor-pointer rounded-sm text-primary-foreground font-bold py-1"
                        type="submit"
                    >
                        Add
                    </button>
                </form>
            </section>
        </>
    );
}
