import { db } from 'src/lib/db'

export const corrections = () => {
  return db.correction.findMany()
}

export const correction = ({ id }) => {
  return db.correction.findUnique({
    where: { id },
  })
}

export const correctionsByDocumentId = ({ documentId }) => {
  return db.correction.findMany({
    where: {
      documentId: documentId,
    },
  })
}

export const createCorrection = ({ input }) => {
  return db.correction.create({
    data: input,
  })
}

export const updateCorrection = ({ id, input }) => {
  return db.correction.update({
    data: input,
    where: { id },
  })
}

export const deleteCorrection = ({ id }) => {
  return db.correction.delete({
    where: { id },
  })
}

export const Correction = {
  professor: (_obj, { root }) => {
    return db.correction.findUnique({ where: { id: root?.id } }).professor()
  },
  subfactor: (_obj, { root }) => {
    return db.correction.findUnique({ where: { id: root?.id } }).subfactor()
  },
  document: (_obj, { root }) => {
    return db.correction.findUnique({ where: { id: root?.id } }).document()
  },
}
