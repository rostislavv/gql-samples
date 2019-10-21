import { ApolloError } from "apollo-server";

export class NotFoundError extends ApolloError {
  constructor(message: string) {
    super(message, "ENTITY_NOT_FOUND");

    Object.defineProperty(this, "name", { value: "NotFoundError" });
  }
}
