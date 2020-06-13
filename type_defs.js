import { gql } from 'apollo-server'

const typeDefs = gql`
    type Places {
        name: String
        lng: Float
        lat: Float
        address: String
        distance: Int
        rating: Float
    }

    type Query {
        places(location: geography!): [Places]
    }

    scalar geography
`;

export default typeDefs;