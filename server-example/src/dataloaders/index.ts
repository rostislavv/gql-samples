import { AuthorsAPI } from "../datasources/authors";
import * as DataLoader from "dataloader";

const batchLoadAuthors = (keys, authorsAPI) => {
  return authorsAPI.getAuthorsByIds(keys);
};

let loader = null;

export const initAuthorsLoader = authorsAPI => {
  if (!loader) {
    loader = new DataLoader(keys => batchLoadAuthors(keys, authorsAPI));
  }
  return loader;
};
