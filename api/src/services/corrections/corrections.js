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
export const countErrorsByCriterion = async ({ documentId }) => {
  const errorsByCriterion =
    await db.$queryRaw`SELECT c2."name", COALESCE(count(c.id), 0) AS count
    FROM "Criterion" c2
    LEFT JOIN "Subfactor" s ON c2.id = s."criterionId"
    LEFT JOIN "Correction" c ON s.id = c."subfactorId" AND c.severity = 'B' AND c."documentId" = ${documentId}
    GROUP BY c2."name"
    ORDER BY c2."name"
    `
  return errorsByCriterion
}
