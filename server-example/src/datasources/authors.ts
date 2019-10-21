import { RESTDataSource } from "apollo-datasource-rest";

export class AuthorsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3002/";
  }
  async getAllAuthors() {
    return await this.get("authors");
  }
  async getAuthorById(id) {
    return await this.get(`authors/${id}`);
  }
}
