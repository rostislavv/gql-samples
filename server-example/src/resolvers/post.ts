import { ForbiddenError } from "apollo-server";
import { performance } from "perf_hooks";
import { posts } from "../data/posts";

const post = {
  id: "0",
  title: "Post0",
  votes: 22,
  authorId: "1",
  createdAt: new Date(),
  someother: "info"
};

export default (parent, args, ctx, info) => {
  if (ctx.user.role !== "admin") throw new ForbiddenError("no permissions");
  // console.log(performance.now());
  // return post;

  return new Promise(res => {
    setTimeout(() => {
      res(post);
    }, 1000);
  });
};
