export default (post, args, { dataSources }, info) => {
  console.log(post.authorId);
  return dataSources.authorsAPI.getAuthorById(post.authorId);
};
