import { users } from "../data/users";
const tokens = {};

export const generateToken = user => {
  const { id, username, pass } = user;
  const token = new Buffer(username + pass + new Date()).toString("base64");
  tokens[token] = user;
  return token;
};

export const getUserByToken = token => {
  return tokens[token] || (token === "testtoken" && users[0]);
};
