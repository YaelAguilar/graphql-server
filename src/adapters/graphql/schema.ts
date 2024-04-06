import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    displayName: String!
  }

  type Comment {
    id: ID!
    comment: String!
    user: User!
    post: Post!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    author: User!
    comments: [Comment!]!
  }

  type PaginatedPosts {
    posts: [Post!]!
    totalCount: Int!
  }

  type PaginatedComments {
    comments: [Comment!]!
    totalCount: Int!
  }

  type Query {
    #5 queries
    getAllUsers: [User!]!
    getUserById(id: ID!): User
    getPostById(id: ID!): Post
    getCommentById(id: ID!): Comment
    getCommentsByPostId(postId: ID!): [Comment!]!
    #2 quieries con paginación
    getAllPosts(limit: Int!, offset: Int!): PaginatedPosts!
    getAllComments(limit: Int!, offset: Int!): PaginatedComments!
  }

  type Mutation {
    #login & register
    register(username: String!, email: String!, password: String!, displayName: String!): String
    login(email: String!, password: String!): String
    #5 mutaciones (1 extra para mantener coherencia)
    createPost(title: String!, body: String!): Post
    updatePost(id: ID!, title: String!, body: String!): Post
    deletePost(postId: ID!): String
    addComment(postId: ID!, comment: String!): Comment
    updateComment(id: ID!, comment: String!): Comment
    deleteComment(id: ID!): String
  }

  type Subscription {
    #1 suscripción
    commentAdded(postId: ID!): Comment
  }
`;