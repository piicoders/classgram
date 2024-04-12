export const schema = gql`
  type Prompt {
    id: Int!
    description: String!
    Criterion: [Criterion]!
    Activity: Activity
  }

  type Query {
    prompts: [Prompt!]! @requireAuth
    prompt(id: Int!): Prompt @requireAuth
  }

  input CreatePromptInput {
    description: String!
  }

  input UpdatePromptInput {
    description: String
  }

  type Mutation {
    createPrompt(input: CreatePromptInput!): Prompt! @requireAuth(roles: ["P"])
    updatePrompt(id: Int!, input: UpdatePromptInput!): Prompt!
      @requireAuth(roles: ["P"])
    deletePrompt(id: Int!): Prompt! @requireAuth(roles: ["P"])
  }
`
