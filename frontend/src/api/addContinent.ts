import { gql } from "@apollo/client";

export const addContinent = gql`
    mutation addContinent($data: NewContinentInput!) {
        addContinent(data: $data) {
            id
            name
        }
    }
`;
