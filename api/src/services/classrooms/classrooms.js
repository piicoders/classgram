import { db } from 'src/lib/db'

export const classrooms = () => {
  return db.classroom.findMany()
}

export const classroom = ({ id }) => {
  return db.classroom.findUnique({
    where: { id },
  })
}

export const classes = async ({ userId }) => {
  const user = await db.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    throw new Error(`User with ID ${userId} does not exist.`)
  }

  return await db.classroom.findMany({
    where: {
      OR: [
        {
          professorId: { equals: userId },
        },
        {
          students: {
            some: {
              id: userId,
            },
          },
        },
      ],
    },
    include: {
      Activity: {
        where: {
          Document: {
            some: {
              studentId: userId,
            },
         },
        },
      },
    },
  });
}

export const createClassroom = ({ input }) => {
  return db.classroom.create({
    data: input,
  })
}

export const addStudentClass = async ({ classCode, studentId }) => {
  const student = await db.user.findUnique({ where: { id: studentId } })

  if (!student) {
    throw new Error(`Student with ID ${studentId} does not exist.`)
  }

  const classroom = await db.classroom.findUnique({
    where: { code: classCode },
    include: { students: true },
  })

  if (!classroom) {
    throw new Error(`Class with code ${classCode} not found.`)
  }

  const isStudentInClass = classroom.students.some(
    (student) => student.id === studentId
  )
  if (isStudentInClass) {
    throw new Error(`Student with ID ${studentId} is already in the class.`)
  }

  return db.classroom.update({
    where: { code: classCode },
    data: {
      students: { connect: { id: studentId } },
    },
  })
}

export const updateClassroom = ({ id, input }) => {
  return db.classroom.update({
    data: input,
    where: { id },
  })
}

export const deleteClassroom = ({ id }) => {
  return db.classroom.delete({
    where: { id },
  })
}

export const Classroom = {
  professor: (_obj, { root }) => {
    return db.classroom.findUnique({ where: { id: root?.id } }).professor()
  },
  students: (_obj, { root }) => {
    return db.classroom.findUnique({ where: { id: root?.id } }).students()
  },
}
