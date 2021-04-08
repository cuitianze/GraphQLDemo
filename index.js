const Koa = require('koa');
const { ApolloServer, gql } = require('apollo-server-koa');

async function startApolloServer() {
    // Construct a schema, using GraphQL schema language
    const typeDefs = gql`
    type Query {
      """组织名称"""
      team: String,
      """成员列表"""
      members: [String],
    },
  `;

    // Provide resolver functions for your schema fields
    const resolvers = {
        Query: {
            team: () => '数据工作台',
            members: () => [
                "cuitianze",
                "panhong",
                "jiashuo",
                ".etc"
            ],
        },
    };

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    const app = new Koa();
    server.applyMiddleware({ app });
    // alternatively you can get a composed middleware from the apollo server
    // app.use(server.getMiddleware());

    await new Promise(resolve => app.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    return { server, app };
}

startApolloServer();