import { graphql } from "graphql";
import { makeExecutableSchema } from "graphql-tools";

const typeDefs = `
  type Query {
    key: String!
  }
`;

const resolvers = {
  Query: {
    key: () => "second"
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const query = `
  query {
    key
  }
`;
graphql(schema, query, null, {}).then(result => {
  console.log(JSON.stringify(result));
});
