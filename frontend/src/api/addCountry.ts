import { gql } from "@apollo/client";

export const addCountry = gql`
    mutation addCountry($data: NewCountryInput!) {
        addCountry(data: $data) {
            id
            code
            name
            continent {
                id
                name
            }
            emoji
        }
    }
`;
