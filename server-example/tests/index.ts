import {
  ApolloServer,
  gql,
  makeExecutableSchema,
  AuthenticationError
} from "apollo-server";
import { AuthorsAPI } from "../src/datasources/authors";
import { createTestClient } from "apollo-server-testing";
import { schema } from "../src";

const post = {
  id: "1",
  title: "title",
  authorId: "1"
};
const author = {
  id: "1",
  name: "name"
};

it("fetches single launch", async () => {
  const authorsAPI = new AuthorsAPI();

  // create a test server to test against, using our production typeDefs,
  // resolvers, and dataSources.
  const PostModel = {
    getById: jest.fn().mockImplementation(() => post)
  };
  const server = new ApolloServer({
    schema,
    dataSources: () => ({ authorsAPI }),
    context: () => ({
      user: { id: 1, email: "a@a.a" },
      models: {
        Post: PostModel
      }
    })
  });

  // mock the dataSource's underlying fetch methods
  authorsAPI.getAuthorById = jest.fn().mockResolvedValue(author);

  // use the test server to create a query function
  const { query } = createTestClient(server);

  // run query against the server and snapshot the output
  const GET_POST = gql`
  query {
    postById(id: "1") {
      id
      title
      author: {
        id
        name
      }
    }
    }
  `;
  const res = await query({ query: GET_POST, variables: { id: 1 } });
  expect(res).toMatchSnapshot();
  expect(PostModel.getById).toHaveBeenCalledWith(1);
  expect(authorsAPI.getAuthorById).toHaveBeenCalledWith(1);
});
