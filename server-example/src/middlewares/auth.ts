import { AuthenticationError } from "apollo-server";

export const authMiddleware = async (resolve, parent, args, ctx, info) => {
  if (!ctx.user && info.fieldName !== "login")
    throw new AuthenticationError("you must be logged in");

  const res = await resolve(parent, args, ctx, info);

  return res;
};
