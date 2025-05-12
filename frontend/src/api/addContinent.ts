import { gql } from "@apollo/client";

export const addCountry = gql`
    mutation addContinent($data: NewContinentInput!) {
        addContinent(data: $data) {
            id
            name
        }
    }
`;
