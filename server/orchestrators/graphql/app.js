const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server');
const moviesSchema = require('./schemas/movieSchema');
const tvSeriesSchema = require('./schemas/tvSeriesSchema');

const typeDefs = gql`
    type Query

    type Mutation
`

const schema = makeExecutableSchema({
    typeDefs: [typeDefs, moviesSchema.typeDefs, tvSeriesSchema.typeDefs],
    resolvers: [moviesSchema.resolvers, tvSeriesSchema.resolvers],
})

const server = new ApolloServer({ schema });

server.listen(4000).then(({ url }) => {
    console.log(`running on: ${url}`);
})