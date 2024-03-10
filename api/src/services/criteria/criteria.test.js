import {
  criteria,
  criterion,
  createCriterion,
  updateCriterion,
  deleteCriterion,
} from './criteria'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('criteria', () => {
  scenario('returns all criteria', async (scenario) => {
    const result = await criteria()

    expect(result.length).toEqual(Object.keys(scenario.criterion).length)
  })

  scenario('returns a single criterion', async (scenario) => {
    const result = await criterion({ id: scenario.criterion.one.id })

    expect(result).toEqual(scenario.criterion.one)
  })

  scenario('creates a criterion', async (scenario) => {
    const result = await createCriterion({
      input: { name: 'String', promptId: scenario.criterion.two.promptId },
    })

    expect(result.name).toEqual('String')
    expect(result.promptId).toEqual(scenario.criterion.two.promptId)
  })

  scenario('updates a criterion', async (scenario) => {
    const original = await criterion({
      id: scenario.criterion.one.id,
    })
    const result = await updateCriterion({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a criterion', async (scenario) => {
    const original = await deleteCriterion({
      id: scenario.criterion.one.id,
    })
    const result = await criterion({ id: original.id })

    expect(result).toEqual(null)
  })
})
