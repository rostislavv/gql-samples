import { performance } from "perf_hooks";

export const logMiddleware = async (resolve, parent, args, ctx, info) => {
  const t1 = performance.now();

  const res = await resolve();

  const t2 = performance.now();
  console.log(`start: ${t1}, end: ${t2}, delta: ${t2 - t1}`);

  return res;
};
