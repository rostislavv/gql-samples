import { rule, shield, and, or, not } from "graphql-shield";

const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    return ctx.user !== null;
  }
);

const isAdmin = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    return ctx.user.role === "admin";
  }
);

const isUser = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    return ctx.user.role === "user";
  }
);

export const permissions = shield({
  Query: {
    posts: and(isAuthenticated, or(isAdmin, isUser)),
    uploads: and(isAuthenticated, isAdmin)
  },
  Mutation: {
    login: not(isAuthenticated)
  }
});
