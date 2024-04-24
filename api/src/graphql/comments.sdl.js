export const schema = gql`
  type Comment {
    id: Int!
    content: String!
    user: User!
    userId: String!
    document: Document!
    documentId: Int!
  }

  type Query {
    commentByDocumentId(documentId: Int!): [Comment!]! @requireAuth
    comments: [Comment!]! @requireAuth
    comment(id: Int!): Comment @requireAuth
  }

  input CreateCommentInput {
    content: String!
    userId: String!
    documentId: Int!
  }

  input UpdateCommentInput {
    content: String
    userId: String
    documentId: Int
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment! @requireAuth
    updateComment(id: Int!, input: UpdateCommentInput!): Comment! @requireAuth
    deleteComment(id: Int!): Comment! @requireAuth
  }
`
