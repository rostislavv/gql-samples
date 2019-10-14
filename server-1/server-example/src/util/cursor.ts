export const paginateResults = ({ after: cursor, pageSize = 20, results }) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);
  const cursorIndex = results.findIndex(item => cursor === item.id);

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize)
        )
    : results.slice(0, pageSize);
};
