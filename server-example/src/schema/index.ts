import { gql } from "apollo-server";

export default gql`
  type Post {
    id: ID!
    title: String
    createdAt: DateTime
    authorId: ID! @deprecated(reason: "Use \`author\`.")
    author: Author # !
    votes: Int
  }

  type Query {
    post: Post
    postById(id: ID!): Post
    posts: [Post]
    postsPaginated(page: Int! = 1, pageSize: Int! = 5): PostConnection
    postsWithCursor(pageSize: Int! = 1, after: String): PostConnectionCursor!

    authors: [Author] @rest(url: "/authors")

    uploads: [File]
  }

  input CreatePostInput {
    id: ID!
    title: String
    createdAt: DateTime
    authorId: Int
    votes: Int
  }

  type Mutation {
    updatePostArgs(
      id: ID!
      title: String
      votes: Int
      createdAt: DateTime
    ): Post
    createPostInput(input: CreatePostInput): Post
    singleUpload(file: Upload!): File!
  }
  type Subscription {
    postAdded: Post
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  scalar DateTime
  scalar Upload

  schema {
    query: Query # get
    mutation: Mutation
    subscription: Subscription
  }

  type PostConnectionCursor { # add this below the Query type as an additional type.
    cursor: String
    hasMore: Boolean
    posts: [Post]!
  }

  type PostConnection {
    data: [Post]
    info: ConnectionInfo
  }

  type ConnectionInfo {
    page: Int!
    total: Int
    pages: Int
  }

  type Author {
    id: ID!
    name: String
  }

  directive @deprecated(
    reason: String = "No longer supported"
  ) on FIELD_DEFINITION | ENUM_VALUE

  directive @rest(url: String) on FIELD_DEFINITION
`;
