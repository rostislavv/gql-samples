import { ApolloServer, gql, makeExecutableSchema } from "apollo-server";
import { applyMiddleware } from "graphql-middleware";
import { AuthorsAPI } from "./datasources/authors";
import typeDefs from "./schema";
import { resolvers } from "./resolvers";
import { DeprecatedDirective } from "./directives/deprecate";
import { RestDirective } from "./directives/rest";
import { logMiddleware } from "./middlewares";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const server = new ApolloServer({
  //  schema: applyMiddleware(schema, logMiddleware),
  schema,
  dataSources: () => ({
    authorsAPI: new AuthorsAPI()
  }),
  schemaDirectives: {
    deprecated: DeprecatedDirective,
    rest: RestDirective
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
