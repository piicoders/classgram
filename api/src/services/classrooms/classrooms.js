import { db } from 'src/lib/db'

export const classrooms = () => {
  return db.classroom.findMany()
}

export const classroom = ({ id }) => {
  return db.classroom.findUnique({
    where: { id },
  })
}

export const professorClasses = ({ professorId }) => {
  return db.classroom.findMany({
    where: { professorId: { equals: professorId } }
  })
}

export const createClassroom = ({ input }) => {
  return db.classroom.create({
    data: input,
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
