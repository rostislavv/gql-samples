import { generateDummyPosts, posts } from "./posts";
import { ForbiddenError } from "apollo-server";

// having this approach dedouples in-resolver approach
export const setUpPostModel = user => ({
  getAll: () => {
    return posts;
  },
  getById: id => {
    if (user.role != "user") throw new ForbiddenError("only user access");

    return posts.find(post => id === post.id);
  }
});
