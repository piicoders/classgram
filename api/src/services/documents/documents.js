import { db } from 'src/lib/db'

export const documents = () => {
  return db.document.findMany()
}

export const document = ({ id }) => {
  return db.document.findUnique({
    where: { id },
  })
}

export const createDocument = ({ input }) => {
  return db.document.create({
    data: input,
  })
}

export const updateDocument = ({ id, input }) => {
  return db.document.update({
    data: input,
    where: { id },
  })
}

export const deleteDocument = ({ id }) => {
  return db.document.delete({
    where: { id },
  })
}

export const findByActivity = ({ activityId }) => {
  return db.document.findMany({
    where: {
      activityId: { equals: activityId },
    },
  })
}

export const findByActivityAndStudent = ({ activityId, studentId }) => {
  return db.document.findFirst({
    where: {
      activityId: { equals: activityId },
      studentId: { equals: studentId },
    },
  })
}

export const Document = {
  activity: (_obj, { root }) => {
    return db.document.findUnique({ where: { id: root?.id } }).activity()
  },
  student: (_obj, { root }) => {
    return db.document.findUnique({ where: { id: root?.id } }).student()
  },
  Correction: (_obj, { root }) => {
    return db.document.findUnique({ where: { id: root?.id } }).Correction()
  },
}
