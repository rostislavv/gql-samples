import { UserInputError } from "apollo-server";
import { users } from "../data/users";
import { generateToken } from "../auth";

export default (parent, args, context, info) => {
  const user = users.find(
    ({ username, pass }) => username === args.username && pass === args.pass
  );
  if (user) {
    return generateToken(user);
  } else {
    throw new UserInputError("wrong creds");
  }
};
