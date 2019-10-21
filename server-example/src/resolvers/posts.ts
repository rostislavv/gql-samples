import { performance } from "perf_hooks";
import { posts } from "../data/posts";

export default () => {
  console.log(performance.now());
  return posts;
};
