import { generateDummyPosts } from "../data/posts";
import { paginate } from "../util/paginate";

export default (parent, { page, pageSize }, context) => {
  const results = [...generateDummyPosts(100)];

  return paginate({
    arr: results,
    pageNumber: page,
    pageSize: pageSize
  });
};
