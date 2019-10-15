import post from "./post";
import postById from "./postById";
import posts from "./posts";
import postsWithCursor from "./postsWithCursor";
import postsPaginated from "./postsPaginated";
import postAuthor from "./postAuthor";
import { DateTime } from "../common/date-scalar";

export const resolvers = {
  Query: {
    post,
    postById,
    posts,
    postsWithCursor,
    postsPaginated
  },
  Post: {
    author: postAuthor
  },
  DateTime
};
