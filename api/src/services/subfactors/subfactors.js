import { db } from 'src/lib/db'

export const subfactors = () => {
  return db.subfactor.findMany()
}

export const subfactor = ({ id }) => {
  return db.subfactor.findUnique({
    where: { id },
  })
}

export const subfactorsByCriterionId = ({ criterionId }) => {
  return db.subfactor.findMany({
    where: { criterionId: criterionId },
  })
}

export const createSubfactor = ({ input }) => {
  return db.subfactor.create({
    data: input,
  })
}

export const updateSubfactor = ({ id, input }) => {
  return db.subfactor.update({
    data: input,
    where: { id },
  })
}

export const deleteSubfactor = ({ id }) => {
  return db.subfactor.delete({
    where: { id },
  })
}

export const Subfactor = {
  criterion: (_obj, { root }) => {
    return db.subfactor.findUnique({ where: { id: root?.id } }).criterion()
  },
  Correction: (_obj, { root }) => {
    return db.subfactor.findUnique({ where: { id: root?.id } }).Correction()
  },
}
