export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String!
    hashedPassword: String!
    salt: String!
    roles: UserType!
    geminiKey: String
    gptKey: String
    resetToken: String
    resetTokenExpiredAt: DateTime
    classesAsProfessor: [Classroom]!
    classesAsStudent: [Classroom]!
  }

  enum UserType {
    P
    S
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    name: String!
    hashedPassword: String!
    salt: String!
    roles: UserType!
    resetToken: String
    resetTokenExpiredAt: DateTime
  }

  input UpdateUserInput {
    email: String
    name: String
    hashedPassword: String
    salt: String
    roles: UserType
    resetToken: String
    resetTokenExpiredAt: DateTime
    gptKey: String
    geminiKey: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
