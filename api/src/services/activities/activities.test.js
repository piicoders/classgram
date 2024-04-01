import {
  activities,
  activity,
  createActivity,
  updateActivity,
  deleteActivity,
} from './activities'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('activities', () => {
  scenario('returns all activities', async (scenario) => {
    const result = await activities()

    expect(result.length).toEqual(Object.keys(scenario.activity).length)
  })

  scenario('returns a single activity', async (scenario) => {
    const result = await activity({ id: scenario.activity.one.id })

    expect(result).toEqual(scenario.activity.one)
  })

  scenario('creates a activity', async () => {
    const result = await createActivity({
      input: {
        description: 'String',
        createdAt: '2024-03-10T14:14:13.084Z',
        dueDate: '2024-03-10T14:14:13.084Z',
        maxSize: 9326817,
      },
    })

    expect(result.description).toEqual('String')
    expect(result.createdAt).toEqual(new Date('2024-03-10T14:14:13.084Z'))
    expect(result.dueDate).toEqual(new Date('2024-03-10T14:14:13.084Z'))
    expect(result.maxSize).toEqual(9326817)
  })

  scenario('updates a activity', async (scenario) => {
    const original = await activity({
      id: scenario.activity.one.id,
    })
    const result = await updateActivity({
      id: original.id,
      input: { description: 'String2' },
    })

    expect(result.description).toEqual('String2')
  })

  scenario('deletes a activity', async (scenario) => {
    const original = await deleteActivity({
      id: scenario.activity.one.id,
    })
    const result = await activity({ id: original.id })

    expect(result).toEqual(null)
  })
})
