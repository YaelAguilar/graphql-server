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

  type Query {
    getAllUsers: [User!]!
    getUserById(id: ID!): User
    getAllPosts: [Post!]!
    getPostById(id: ID!): Post
    getAllComments: [Comment!]!
    getCommentById(id: ID!): Comment
  }

  type Mutation {
    register(username: String!, email: String!, password: String!, displayName: String!): String
    login(email: String!, password: String!): String
    createPost(title: String!, body: String!): Post
    updatePost(id: ID!, title: String!, body: String!): Post
    deletePost(postId: ID!): String
    addComment(postId: ID!, comment: String!): Comment
    updateComment(id: ID!, comment: String!): Comment
    deleteComment(id: ID!): String
  }

  type Subscription {
    commentAdded(postId: ID!): Comment
  }
`;