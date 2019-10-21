import { generateDummyPosts } from "../data/posts";
import { paginateResults } from "../util/cursor";

export default (parent, { pageSize = 20, after }, context) => {
  const results = [...generateDummyPosts(100)];
  const posts = paginateResults({
    after,
    pageSize,
    results
  });
  return {
    posts,
    cursor: posts.length ? posts[posts.length - 1].id : null,
    // if the cursor of the end of the paginated results is the same as the
    // last item in _all_ results, then there are no more results after this
    hasMore: posts.length
      ? posts[posts.length - 1].id !== results[results.length - 1].id
      : false
  };
};
