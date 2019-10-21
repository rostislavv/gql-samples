import { getRandomInt } from "../data/posts";
import { NotFoundError } from "../errors";

export default (post, args, { dataSources }, info) => {
  // return dataSources.authorsAPI.getAuthorById(post.authorId);
  if (getRandomInt(1, 2) == 1) {
    return dataSources.authorsAPI.getAuthorById(post.authorId);
  } else {
    return new NotFoundError("Author not found");
  }
};
