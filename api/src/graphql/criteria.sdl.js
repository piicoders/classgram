export const schema = gql`
  type Criterion {
    id: Int!
    name: String!
    prompt: Prompt
    promptId: Int!
    Subfactor: [Subfactor]!
  }

  type Query {
    criteria: [Criterion!]! @requireAuth
    criterion(id: Int!): Criterion @requireAuth
    criteriaByPromptId(promptId: Int!): [Criterion!]! @requireAuth
  }

  input CreateCriterionInput {
    name: String!
    promptId: Int!
  }

  input UpdateCriterionInput {
    name: String
    promptId: Int
  }

  type Mutation {
    createCriterion(input: CreateCriterionInput!): Criterion!
      @requireAuth(roles: ["P"])
    updateCriterion(id: Int!, input: UpdateCriterionInput!): Criterion!
      @requireAuth(roles: ["P"])
    deleteCriterion(id: Int!): Criterion! @requireAuth(roles: ["P"])
  }
`
