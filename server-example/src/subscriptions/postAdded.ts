import { pubsub } from "../util/pubsub";

export default () => pubsub.asyncIterator(["POST_ADDED"]);
