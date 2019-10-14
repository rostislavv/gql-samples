function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function* generateDummyPosts(amount: Number) {
  for (let i = 1; i <= amount; i++) {
    yield {
      id: i.toString(),
      title: "Post" + i,
      votes: 10 + i,
      authorId: getRandomInt(1, 3).toString(),
      createdAt: new Date()
    };
  }
}

export const posts = [...generateDummyPosts(10)];
