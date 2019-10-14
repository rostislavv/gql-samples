import { posts } from "../data/posts";

export default (parent, args, context, info) => {
  return posts.find(post => args.id === post.id);
};
