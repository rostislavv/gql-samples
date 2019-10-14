import { gql } from "apollo-server";

export default gql`
  type Post {
    id: ID!
    title: String
    createdAt: DateTime
    authorId: ID! # @deprecated(reason: "Use \`author\`.")
    # author: Author
    votes: Int
  }

  type Query {
    # simplest possible
    post: Post

    # with argument id
    postById(id: ID!): Post

    # simple list
    posts: [Post]

    # simple pagination
    postsPaginated(page: Int! = 1, pageSize: Int! = 5): PostConnection

    # cursor based pagination
    postsWithCursor(pageSize: Int! = 1, after: String): PostConnectionCursor!

    # authors: [Author] @rest(url: "/authors")
  }

  scalar DateTime

  schema {
    query: Query # get
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
