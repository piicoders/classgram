export const schema = gql`
  type Document {
    id: Int!
    content: String!
    handed: DateTime!
    mark: Int
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
    mark: Int
    handed: DateTime!
    activityId: Int
    studentId: String
  }

  input UpdateDocumentInput {
    content: String
    mark: Int
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
