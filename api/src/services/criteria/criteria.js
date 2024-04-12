import { db } from 'src/lib/db'

export const criteria = () => {
  return db.criterion.findMany()
}

export const criterion = ({ id }) => {
  return db.criterion.findUnique({
    where: { id },
  })
}

export const criteriaByPromptId = ({ promptId }) => {
  return db.criterion.findMany({
    where: { promptId: promptId },
  })
}

export const createCriterion = ({ input }) => {
  return db.criterion.create({
    data: input,
  })
}

export const updateCriterion = ({ id, input }) => {
  return db.criterion.update({
    data: input,
    where: { id },
  })
}

export const deleteCriterion = ({ id }) => {
  return db.criterion.delete({
    where: { id },
  })
}

export const Criterion = {
  prompt: (_obj, { root }) => {
    return db.criterion.findUnique({ where: { id: root?.id } }).prompt()
  },
  Subfactor: (_obj, { root }) => {
    return db.criterion.findUnique({ where: { id: root?.id } }).Subfactor()
  },
}
