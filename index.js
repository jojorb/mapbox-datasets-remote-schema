import { ApolloServer } from 'apollo-server'
import resolvers from './resolvers'
import typeDefs from './type_defs'

const schema = new ApolloServer({ typeDefs, resolvers });

schema.listen({ port: process.env.PORT}).then(({ url }) => {
    console.log(`schema ready at ${url}`);
});