import "apollo-cache-control";
import { getRandomInt } from "../data/posts";
import { NotFoundError } from "../errors";
import { initAuthorsLoader } from "../dataloaders";

export default (post, args, { dataSources }, info) => {
  info.cacheControl.setCacheHint({ maxAge: 60 });

  const loader = initAuthorsLoader(dataSources.authorsAPI);

  // return fetch(`/authors/${post.authorId}`) // n+1 problem exactly

  // datasource performs entity level in-memory cache
  // but there anyway will be 3 calls - ignoring repeated
  //return dataSources.authorsAPI.getAuthorById(post.authorId);

  // 1 call
  return loader.load(post.authorId);
  /*
  if (getRandomInt(1, 2) == 1) {
    return dataSources.authorsAPI.getAuthorById(post.authorId);
  } else {
    return new NotFoundError("Author not found");
  }
 */
};
