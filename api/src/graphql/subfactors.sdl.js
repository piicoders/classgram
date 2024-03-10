export const schema = gql`
  type Subfactor {
    id: Int!
    description: String!
    criterion: Criterion
    criterionId: Int!
    Correction: [Correction]!
  }

  type Query {
    subfactors: [Subfactor!]! @requireAuth
    subfactor(id: Int!): Subfactor @requireAuth
  }

  input CreateSubfactorInput {
    description: String!
    criterionId: Int!
  }

  input UpdateSubfactorInput {
    description: String
    criterionId: Int
  }

  type Mutation {
    createSubfactor(input: CreateSubfactorInput!): Subfactor! @requireAuth
    updateSubfactor(id: Int!, input: UpdateSubfactorInput!): Subfactor!
      @requireAuth
    deleteSubfactor(id: Int!): Subfactor! @requireAuth
  }
`
