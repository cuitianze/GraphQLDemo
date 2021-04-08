const Koa = require('koa');
const { ApolloServer, gql } = require('apollo-server-koa');
const { initMongo, M } = require('./mongo');

async function startApolloServer() {
  initMongo();
  const Mapp = M('Mapp');

  // Construct a schema, using GraphQL schema language
  const typeDefs = gql`
    type Subapp {
      name: String,
      assets: [String],
      version: String,
    }
    type CurStatus {
      status: String,
      id: String,
      # date: Date,
    }
    type Mapp {
      id: String,
      appId: String,
      appKey: String,
      """项目名称"""
      title: String,
      intro: String,
      subapp: [Subapp],
      entry: String,
      # proxy: Object,
      template: String,
      omega: String,
      authSystem: String,
      """项目成员"""
      collaborators: [String],
      """项目创建者"""
      creator: String,
      curStatus: CurStatus,
      statusList: [CurStatus],
      # createDate: Date,
      appEnv: String,
      callbackIndex: String,
      domain: String,
      icon: String,
      layout: String,
      raven: String,
      style: String,
    }
    type Query {
      allMappList: [Mapp],
    },
  `;

  // Provide resolver functions for your schema fields
  const resolvers = {
    Query: {
      allMappList: async () => {
        const list = await Mapp.find()
        return list;
      }
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  const app = new Koa();
  server.applyMiddleware({ app });
  // alternatively you can get a composed middleware from the apollo server
  // app.use(server.getMiddleware());

  await new Promise(resolve => app.listen({ port: 4001 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`);
  return { server, app };
}

startApolloServer();