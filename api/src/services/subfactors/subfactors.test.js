import {
  subfactors,
  subfactor,
  createSubfactor,
  updateSubfactor,
  deleteSubfactor,
} from './subfactors'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('subfactors', () => {
  scenario('returns all subfactors', async (scenario) => {
    const result = await subfactors()

    expect(result.length).toEqual(Object.keys(scenario.subfactor).length)
  })

  scenario('returns a single subfactor', async (scenario) => {
    const result = await subfactor({ id: scenario.subfactor.one.id })

    expect(result).toEqual(scenario.subfactor.one)
  })

  scenario('creates a subfactor', async (scenario) => {
    const result = await createSubfactor({
      input: {
        description: 'String',
        criterionId: scenario.subfactor.two.criterionId,
      },
    })

    expect(result.description).toEqual('String')
    expect(result.criterionId).toEqual(scenario.subfactor.two.criterionId)
  })

  scenario('updates a subfactor', async (scenario) => {
    const original = await subfactor({
      id: scenario.subfactor.one.id,
    })
    const result = await updateSubfactor({
      id: original.id,
      input: { description: 'String2' },
    })

    expect(result.description).toEqual('String2')
  })

  scenario('deletes a subfactor', async (scenario) => {
    const original = await deleteSubfactor({
      id: scenario.subfactor.one.id,
    })
    const result = await subfactor({ id: original.id })

    expect(result).toEqual(null)
  })
})
