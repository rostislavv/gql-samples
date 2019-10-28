import { GraphQLField, GraphQLEnumValue, defaultFieldResolver } from "graphql";
import { SchemaDirectiveVisitor } from "apollo-server";

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function(...args) {
      const requiredRole = this.args.requires;

      if (!requiredRole) {
        return resolve.apply(this, args);
      }

      const context = args[2];
      if (context.user.role !== requiredRole.toLowerCase()) {
        throw new Error("not authorized");
      }

      return resolve.apply(this, args);
    };
  }
}
