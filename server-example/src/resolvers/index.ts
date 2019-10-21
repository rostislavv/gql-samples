import post from "./post";
import postById from "./postById";
import posts from "./posts";
import postsWithCursor from "./postsWithCursor";
import postsPaginated from "./postsPaginated";
import postAuthor from "./postAuthor";
import uploads from "./uploads";
import { DateTime } from "../common/date-scalar";
import { mutations } from "../mutations";
import { subscriptions } from "../subscriptions";

export const resolvers = {
  Query: {
    post,
    postById,
    posts,
    postsWithCursor,
    postsPaginated,

    uploads
  },
  Post: {
    author: postAuthor
  },
  DateTime,
  ...mutations,
  ...subscriptions
};
