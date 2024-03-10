export const schema = gql`
  type Document {
    id: Int!
    content: String!
    handed: DateTime!
    activity: Activity
    activityId: Int
    student: User
    studentId: String
    Correction: [Correction]!
  }

  type Query {
    documents: [Document!]! @requireAuth
    document(id: Int!): Document @requireAuth
  }

  input CreateDocumentInput {
    content: String!
    handed: DateTime!
    activityId: Int
    studentId: String
  }

  input UpdateDocumentInput {
    content: String
    handed: DateTime
    activityId: Int
    studentId: String
  }

  type Mutation {
    createDocument(input: CreateDocumentInput!): Document! @requireAuth
    updateDocument(id: Int!, input: UpdateDocumentInput!): Document!
      @requireAuth
    deleteDocument(id: Int!): Document! @requireAuth
  }
`
