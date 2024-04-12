export const schema = gql`
  type Correction {
    id: Int!
    text: String!
    description: String!
    correct: String
    severity: Severity!
    professor: User
    professorId: String
    subfactor: Subfactor
    subfactorId: Int!
    document: Document
    documentId: Int!
  }

  enum Severity {
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
    description: String!
    correct: String
    severity: Severity!
    professorId: String
    subfactorId: Int!
    documentId: Int!
  }

  input UpdateCorrectionInput {
    text: String
    description: String
    correct: String
    severity: Severity
    professorId: String
    subfactorId: Int
    documentId: Int
  }

  type Mutation {
    createCorrection(input: CreateCorrectionInput!): Correction!
      @requireAuth(roles: ["P"])
    updateCorrection(id: Int!, input: UpdateCorrectionInput!): Correction!
      @requireAuth(roles: ["P"])
    deleteCorrection(id: Int!): Correction! @requireAuth(roles: ["P"])
  }
`
