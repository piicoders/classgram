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
        text: 'String',
        description: 'String',
        severity: 'N',
        subfactorId: scenario.correction.two.subfactorId,
        documentId: scenario.correction.two.documentId,
      },
    })

    expect(result.text).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.severity).toEqual('N')
    expect(result.subfactorId).toEqual(scenario.correction.two.subfactorId)
    expect(result.documentId).toEqual(scenario.correction.two.documentId)
  })

  scenario('updates a correction', async (scenario) => {
    const original = await correction({
      id: scenario.correction.one.id,
    })
    const result = await updateCorrection({
      id: original.id,
      input: { text: 'String2' },
    })

    expect(result.text).toEqual('String2')
  })

  scenario('deletes a correction', async (scenario) => {
    const original = await deleteCorrection({
      id: scenario.correction.one.id,
    })
    const result = await correction({ id: original.id })

    expect(result).toEqual(null)
  })
})
