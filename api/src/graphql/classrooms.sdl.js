export const schema = gql`
  type Classroom {
    id: Int!
    name: String!
    code: String
    professor: User!
    professorId: String!
    students: [User]!
    Activity: [Activity]!
  }

  type Query {
    classrooms: [Classroom!]! @requireAuth
    classroom(id: Int!): Classroom @requireAuth
    classes(userId: String!): [Classroom!]! @requireAuth
    classStudents(id: Int!): [User!]! @requireAuth
  }

  input CreateClassroomInput {
    name: String!
    code: String
    professorId: String!
  }

  input UpdateClassroomInput {
    name: String
    code: String
    professorId: String
  }

  type Mutation {
    createClassroom(input: CreateClassroomInput!): Classroom!
      @requireAuth(roles: ["P"])
    updateClassroom(id: Int!, input: UpdateClassroomInput!): Classroom!
      @requireAuth(roles: ["P"])
    deleteClassroom(id: Int!): Classroom! @requireAuth(roles: ["P"])
    addStudentClass(classCode: String!, studentId: String!): Classroom!
      @requireAuth
  }
`
