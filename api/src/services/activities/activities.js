import { db } from 'src/lib/db'

export const activities = () => {
  return db.activity.findMany()
}

export const activity = ({ id }) => {
  return db.activity.findUnique({
    where: { id },
  })
}

export const activityByClassId = async ({classId}) => {
  const classroom = await db.classroom.findUnique({where: {id: classId}})

  if (!classroom) {
    throw new Error(`Class with ID ${classId} does not exist.`)
  }

  return db.activity.findMany({
    where: {classroomId: classId}
  })
}

export const unfinishedActivitiesByStudentIdAndClassId = async ({classId, studentId}) => {
  const student = await db.user.findUnique({ where: { id: studentId } })

  if (!student) {
    throw new Error(`Student with ID ${studentId} does not exist.`)
  }

  const classroom = await db.classroom.findUnique({where: {id: classId}})

  if (!classroom) {
    throw new Error(`Class with ID ${classId} does not exist.`)
  }

  return await db.activity.findMany({
    where: {
      classroomId: classId,
      Document: {
        none: {
          studentId: studentId,
        },
    },
  }
  })
}

export const createActivity = ({ input }) => {
  return db.activity.create({
    data: input,
  })
}

export const updateActivity = ({ id, input }) => {
  return db.activity.update({
    data: input,
    where: { id },
  })
}

export const deleteActivity = ({ id }) => {
  return db.activity.delete({
    where: { id },
  })
}

export const Activity = {
  prompt: (_obj, { root }) => {
    return db.activity.findUnique({ where: { id: root?.id } }).prompt()
  },
  Classroom: (_obj, { root }) => {
    return db.activity.findUnique({ where: { id: root?.id } }).Classroom()
  },
  Document: (_obj, { root }) => {
    return db.activity.findUnique({ where: { id: root?.id } }).Document()
  },
}
