import {
  documents,
  document,
  createDocument,
  updateDocument,
  deleteDocument,
} from './documents'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('documents', () => {
  scenario('returns all documents', async (scenario) => {
    const result = await documents()

    expect(result.length).toEqual(Object.keys(scenario.document).length)
  })

  scenario('returns a single document', async (scenario) => {
    const result = await document({ id: scenario.document.one.id })

    expect(result).toEqual(scenario.document.one)
  })

  scenario('creates a document', async () => {
    const result = await createDocument({
      input: { content: 'String' },
    })

    expect(result.content).toEqual('String')
  })

  scenario('updates a document', async (scenario) => {
    const original = await document({
      id: scenario.document.one.id,
    })
    const result = await updateDocument({
      id: original.id,
      input: { content: 'String2' },
    })

    expect(result.content).toEqual('String2')
  })

  scenario('deletes a document', async (scenario) => {
    const original = await deleteDocument({
      id: scenario.document.one.id,
    })
    const result = await document({ id: original.id })

    expect(result).toEqual(null)
  })
})
