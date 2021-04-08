const Koa = require('koa');
const { composeMongoose } = require('graphql-compose-mongoose');
const { schemaComposer } = require('graphql-compose');
const { ApolloServer } = require('apollo-server-koa');
const { initMongo, M } = require('./mongo');

async function startApolloServer() {
  initMongo();
  const Mapp = M('Mapp');

  const customizationOptions = {};
  const MappTC = composeMongoose(Mapp, customizationOptions);

  schemaComposer.Query.addFields({
    mappById: MappTC.mongooseResolvers.findById(),
    mappOne: MappTC.mongooseResolvers.findOne(),
    userMany: MappTC.mongooseResolvers.findMany(),
    userCount: MappTC.mongooseResolvers.count(),
  });

  const graphqlSchema = schemaComposer.buildSchema();

  const server = new ApolloServer({schema: graphqlSchema});
  await server.start();

  const app = new Koa();
  server.applyMiddleware({ app });
  // alternatively you can get a composed middleware from the apollo server
  // app.use(server.getMiddleware());

  await new Promise(resolve => app.listen({ port: 4002 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4002${server.graphqlPath}`);
  return { server, app };
}

startApolloServer();