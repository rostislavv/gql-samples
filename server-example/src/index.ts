import {
  ApolloServer,
  gql,
  makeExecutableSchema,
  AuthenticationError
} from "apollo-server";
import { applyMiddleware } from "graphql-middleware";
import { AuthorsAPI } from "./datasources/authors";
import typeDefs from "./schema";
import { resolvers } from "./resolvers";
import { DeprecatedDirective } from "./directives/deprecate";
import { RestDirective } from "./directives/rest";
import { AuthDirective } from "./directives/auth";
import { logMiddleware } from "./middlewares";
import { getRandomInt } from "./data/posts";
import { authMiddleware } from "./middlewares/auth";
import { getUserByToken } from "./auth";
import { setUpPostModel } from "./data/postModel";
import { permissions } from "./middlewares/shield";
import { PerformancePlugin } from "./plugins";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const server = new ApolloServer({
  schema: applyMiddleware(schema, /*permissions,*/ authMiddleware),
  // typeDefs,
  // resolvers,
  dataSources: () => ({
    authorsAPI: new AuthorsAPI()
  }),
  plugins: [PerformancePlugin],
  schemaDirectives: {
    auth: AuthDirective,
    deprecated: DeprecatedDirective,
    rest: RestDirective
  },
  context: ({ req }) => {
    const token = req.headers.authorization || "";

    const user = getUserByToken(token);

    if (!user && token === "testtoken")
      throw new AuthenticationError("you must be logged in");

    return {
      user,
      models: {
        Post: setUpPostModel(user)
      }
    };
  },
  // mock: true,
  mocks: {
    Comment: () => ({
      id: () => 1,
      authorId: () => getRandomInt(1, 3),
      text: () => "mocked comments"
    }),
    Int: () => 6,
    Float: () => 22.1,
    String: () => "Hello"
  },
  mockEntireSchema: false
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
