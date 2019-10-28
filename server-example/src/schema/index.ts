import { gql } from "apollo-server";

export default gql`
  type Post {
    id: ID!
    title: String
    createdAt: DateTime # @auth(requires: ADMIN)
    authorId: ID! @deprecated(reason: "Use \`author\`.")
    author: Author # @cacheControl(maxAge: 30)
    votes: Int
  }

  type Query {
    post: Post # resolver authorization
    postById(id: ID!): Post # model authorization
    posts: [Post]
    postsPaginated(page: Int! = 1, pageSize: Int! = 5): PostConnection
    postsWithCursor(pageSize: Int! = 1, after: String): PostConnectionCursor!

    authors: [Author] @rest(url: "/authors")

    uploads: [File]

    comment: Comment
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

    login(username: String, pass: String): String # login token
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

  type Comment {
    id: ID!
    authorId: ID! @deprecated(reason: "Use \`author\`.")
    text: String
  }

  directive @deprecated(
    reason: String = "No longer supported"
  ) on FIELD_DEFINITION | ENUM_VALUE

  directive @rest(url: String) on FIELD_DEFINITION

  enum Role {
    ADMIN
    USER
  }

  directive @auth(requires: Role = ADMIN) on FIELD_DEFINITION
`;
