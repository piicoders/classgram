import {
  prompts,
  prompt,
  createPrompt,
  updatePrompt,
  deletePrompt,
} from './prompts'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('prompts', () => {
  scenario('returns all prompts', async (scenario) => {
    const result = await prompts()

    expect(result.length).toEqual(Object.keys(scenario.prompt).length)
  })

  scenario('returns a single prompt', async (scenario) => {
    const result = await prompt({ id: scenario.prompt.one.id })

    expect(result).toEqual(scenario.prompt.one)
  })

  scenario('creates a prompt', async () => {
    const result = await createPrompt({
      input: { description: 'String' },
    })

    expect(result.description).toEqual('String')
  })

  scenario('updates a prompt', async (scenario) => {
    const original = await prompt({ id: scenario.prompt.one.id })
    const result = await updatePrompt({
      id: original.id,
      input: { description: 'String2' },
    })

    expect(result.description).toEqual('String2')
  })

  scenario('deletes a prompt', async (scenario) => {
    const original = await deletePrompt({
      id: scenario.prompt.one.id,
    })
    const result = await prompt({ id: original.id })

    expect(result).toEqual(null)
  })
})
