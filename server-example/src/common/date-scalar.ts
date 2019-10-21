import { ASTNode, GraphQLScalarType, Kind } from "graphql";
import { gql } from "apollo-server";

export const DateTime = new GraphQLScalarType({
  name: "DateTime",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // value sent to the client
  },
  parseValue(value) {
    console.log("parseValue", value);
    return new Date(value); // value from the client in variable
  },
  parseLiteral(ast: ASTNode) {
    console.log("astNode", ast);
    if (ast.kind === Kind.INT) {
      console.log("parseLiteral", ast.value);
      return new Date(parseInt(ast.value, 10)); // ast value is always in string format
    }
    return null;
  }
});
