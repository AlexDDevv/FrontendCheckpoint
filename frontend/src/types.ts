export type CountryType = {
    name: string;
    code: string;
    emoji: string;
    continent: ContinentType;
};

export type ContinentType = {
    id: number;
    name: string;
};
