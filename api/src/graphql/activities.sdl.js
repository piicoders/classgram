export const schema = gql`
  type Activity {
    id: Int!
    name: String!
    description: String!
    createdAt: DateTime!
    dueDate: DateTime!
    maxSize: Int!
    prompt: Prompt
    promptId: Int
    Classroom: Classroom
    classroomId: Int
    Document: [Document]!
  }

  type Query {
    activities: [Activity!]! @requireAuth
    activity(id: Int!): Activity @requireAuth
    activityByClassId(classId: Int!): [Activity!]! @requireAuth
    unfinishedActivitiesByStudentIdAndClassId(
      classId: Int!
      studentId: String!
    ): [Activity!]! @requireAuth
  }

  input CreateActivityInput {
    name: String!
    description: String!
    dueDate: DateTime!
    maxSize: Int!
    promptId: Int
    classroomId: Int
  }

  input UpdateActivityInput {
    name: String
    description: String
    dueDate: DateTime
    maxSize: Int
    promptId: Int
    classroomId: Int
  }

  type Mutation {
    createActivity(input: CreateActivityInput!): Activity!
      @requireAuth(roles: ["P"])
    updateActivity(id: Int!, input: UpdateActivityInput!): Activity!
      @requireAuth(roles: ["P"])
    deleteActivity(id: Int!): Activity! @requireAuth(roles: ["P"])
  }
`
