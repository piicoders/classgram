export const schema = gql`
  type Subfactor {
    id: Int!
    name: String!
    description: String!
    criterion: Criterion
    criterionId: Int!
    Correction: [Correction]!
  }

  type Query {
    subfactors: [Subfactor!]! @requireAuth
    subfactor(id: Int!): Subfactor @requireAuth
    subfactorsByCriterionId(criterionId: Int!): [Subfactor!]! @requireAuth
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
    createSubfactor(input: CreateSubfactorInput!): Subfactor!
      @requireAuth(roles: ["P"])
    updateSubfactor(id: Int!, input: UpdateSubfactorInput!): Subfactor!
      @requireAuth(roles: ["P"])
    deleteSubfactor(id: Int!): Subfactor! @requireAuth(roles: ["P"])
  }
`
