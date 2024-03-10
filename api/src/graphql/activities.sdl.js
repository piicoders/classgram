export const schema = gql`
  type Activity {
    id: Int!
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
    unfinishedActivitiesByStudentIdAndClassId(classId: Int!, studentId: String!): [Activity!]! @requireAuth
  }

  input CreateActivityInput {
    description: String!
    dueDate: DateTime!
    maxSize: Int!
    promptId: Int
    classroomId: Int
  }

  input UpdateActivityInput {
    description: String
    dueDate: DateTime
    maxSize: Int
    promptId: Int
    classroomId: Int
  }

  type Mutation {
    createActivity(input: CreateActivityInput!): Activity! @requireAuth
    updateActivity(id: Int!, input: UpdateActivityInput!): Activity!
      @requireAuth
    deleteActivity(id: Int!): Activity! @requireAuth
  }
`
