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
    subFactorsMark: String
  }

  type Query {
    documents: [Document!]! @requireAuth
    document(id: Int!): Document @requireAuth
    findByActivity(activityId: Int!): [Document!]! @requireAuth
    findByActivityAndStudent(activityId: Int!, studentId: String!): Document! @requireAuth
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
    updateMarkByDocumentId(subFactorsMark: String!, mark: Int!, id: Int!): Document! @requireAuth
    deleteDocument(id: Int!): Document! @requireAuth
  }
`
