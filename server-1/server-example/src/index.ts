import { ApolloServer, gql } from "apollo-server";
import { AuthorsAPI } from "./datasources/authors";
import typeDefs from "./schema";
import { resolvers } from "./resolvers";
import { DeprecatedDirective } from "./directives/deprecate";
import { RestDirective } from "./directives/rest";

const server = new ApolloServer({
  typeDefs,
  resolvers
  /*
  dataSources: () => ({
    authorsAPI: new AuthorsAPI()
  }),
 */
  /*
  schemaDirectives: {
    deprecated: DeprecatedDirective,
    rest: RestDirective
  }
 */
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
