import { performance } from "perf_hooks";
import { pubsub } from "../util/pubsub";

import { posts } from "../data/posts";
export default (parent, args, context, info) => {
  console.log(performance.now());
  const post = args.input;

  console.log("create post", post);

  return new Promise(res => {
    setTimeout(() => {
      posts.push(post);

      pubsub.publish("POST_ADDED", { postAdded: post });

      res(post);
    }, 2000);
  });
};
