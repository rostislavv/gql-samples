const { ApolloServer, gql } = require("apollo-server");

const resolvers = {
  Query: {
    key: () => "third"
  }
};

const typeDefs = gql`
  type Query {
    key: String
  }
`;

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
