import { db } from 'src/lib/db'

export const classrooms = () => {
  return db.classroom.findMany()
}

export const classroom = ({ id }) => {
  return db.classroom.findUnique({
    where: { id },
  })
}

export const professorClasses = async ({ professorId }) => {
  const professor = await db.user.findUnique({
    where: { id: professorId },
  })

  if (!professor) {
    throw new Error(`Professor with ID ${professorId} does not exist.`)
  }

  return db.classroom.findMany({
    where: { professorId: { equals: professorId } },
    include: { professor: true, Activity: true, students: true },
  })
}

export const studentClasses = async ({ studentId }) => {
  const student = await db.user.findUnique({ where: { id: studentId } })

  if (!student) {
    throw new Error(`Student with ID ${studentId} does not exist.`)
  }

  return await db.classroom.findMany({
    where: {
      students: {
        some: {
          id: studentId,
        },
      },
    },
    include: {
      Activity: {
        where: {
          Document: {
            some: {
              studentId: studentId,
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
