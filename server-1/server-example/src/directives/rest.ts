import fetch from "node-fetch";
import { ApolloServer, gql, SchemaDirectiveVisitor } from "apollo-server";

const baseURL = "http://localhost:3000";

export class RestDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field) {
    const { url } = this.args;
    field.resolve = () => fetch(baseURL + url).then(res => res.json());
  }
}
