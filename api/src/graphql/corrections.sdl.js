export const schema = gql`
  type Correction {
    id: Int!
    text: String!
    severity: Severity!
    description: String!
    correct: String
    professor: User
    professorId: String
    subfactor: Subfactor
    subfactorId: Int!
    document: Document
    documentId: Int!
  }

  type Severity {
    N
    B
    G
  }

  type Query {
    corrections: [Correction!]! @requireAuth
    correction(id: Int!): Correction @requireAuth
  }

  input CreateCorrectionInput {
    text: String!
    severity: Severity!
    correct: String
    description: String!
    professorId: String
    subfactorId: Int!
    documentId: Int!
  }

  input UpdateCorrectionInput {
    text: String
    severity: Severity
    correct: String
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
