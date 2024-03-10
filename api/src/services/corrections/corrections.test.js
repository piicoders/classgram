import {
  corrections,
  correction,
  createCorrection,
  updateCorrection,
  deleteCorrection,
} from './corrections'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('corrections', () => {
  scenario('returns all corrections', async (scenario) => {
    const result = await corrections()

    expect(result.length).toEqual(Object.keys(scenario.correction).length)
  })

  scenario('returns a single correction', async (scenario) => {
    const result = await correction({ id: scenario.correction.one.id })

    expect(result).toEqual(scenario.correction.one)
  })

  scenario('creates a correction', async (scenario) => {
    const result = await createCorrection({
      input: {
        from: 5398409,
        to: 3207379,
        description: 'String',
        subfactorId: scenario.correction.two.subfactorId,
        documentId: scenario.correction.two.documentId,
      },
    })

    expect(result.from).toEqual(5398409)
    expect(result.to).toEqual(3207379)
    expect(result.description).toEqual('String')
    expect(result.subfactorId).toEqual(scenario.correction.two.subfactorId)
    expect(result.documentId).toEqual(scenario.correction.two.documentId)
  })

  scenario('updates a correction', async (scenario) => {
    const original = await correction({
      id: scenario.correction.one.id,
    })
    const result = await updateCorrection({
      id: original.id,
      input: { from: 1285618 },
    })

    expect(result.from).toEqual(1285618)
  })

  scenario('deletes a correction', async (scenario) => {
    const original = await deleteCorrection({
      id: scenario.correction.one.id,
    })
    const result = await correction({ id: original.id })

    expect(result).toEqual(null)
  })
})
