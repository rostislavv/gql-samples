import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from "graphql";

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      key: {
        type: GraphQLString,
        resolve() {
          return "first";
        }
      }
    }
  })
});

var query = "{ key }";

graphql(schema, query).then(result => {
  console.log(JSON.stringify(result));
});
