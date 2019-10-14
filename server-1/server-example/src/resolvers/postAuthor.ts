export default (post, args, { dataSources }, info) => {
  return dataSources.authorsAPI.getAuthorById(post.authorId);
};
