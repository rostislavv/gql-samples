import postAdded from "./postAdded";

export const subscriptions = {
  Subscription: {
    postAdded: {
      subscribe: postAdded
    }
  }
};
