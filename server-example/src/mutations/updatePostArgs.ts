import { posts } from "../data/posts";
export default (parent, args, context, info) => {
  const post = posts.find(({ id }) => id === args.id);
  post.title = args.title;
  post.votes = args.votes;
  console.log("mutation's createdAt:", args.createdAt);
  post.createdAt = args.createdAt || new Date();
  return post;
};
