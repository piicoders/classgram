export const schema = gql`
  type Correction {
    id: Int!
    from: Int!
    to: Int!
    description: String!
    professor: User
    professorId: String
    subfactor: Subfactor
    subfactorId: Int!
    document: Document
    documentId: Int!
  }

  type Query {
    corrections: [Correction!]! @requireAuth
    correction(id: Int!): Correction @requireAuth
  }

  input CreateCorrectionInput {
    from: Int!
    to: Int!
    description: String!
    professorId: String
    subfactorId: Int!
    documentId: Int!
  }

  input UpdateCorrectionInput {
    from: Int
    to: Int
    description: String
    professorId: String
    subfactorId: Int
    documentId: Int
  }

  type Mutation {
    createCorrection(input: CreateCorrectionInput!): Correction! @requireAuth
    updateCorrection(id: Int!, input: UpdateCorrectionInput!): Correction!
      @requireAuth
    deleteCorrection(id: Int!): Correction! @requireAuth
  }
`
