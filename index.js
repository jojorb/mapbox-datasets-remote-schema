import { ApolloServer } from 'apollo-server'
import resolvers from './resolvers'
import typeDefs from './type_defs'

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT}).then(({ url }) => {
    console.log(`🚀  remote schema service ready at ${url}`);
});