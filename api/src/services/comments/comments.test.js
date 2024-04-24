import {
  comments,
  comment,
  createComment,
  updateComment,
  deleteComment,
} from './comments'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('comments', () => {
  scenario('returns all comments', async (scenario) => {
    const result = await comments()

    expect(result.length).toEqual(Object.keys(scenario.comment).length)
  })

  scenario('returns a single comment', async (scenario) => {
    const result = await comment({ id: scenario.comment.one.id })

    expect(result).toEqual(scenario.comment.one)
  })

  scenario('creates a comment', async (scenario) => {
    const result = await createComment({
      input: {
        content: 'String',
        userId: scenario.comment.two.userId,
        documentId: scenario.comment.two.documentId,
      },
    })

    expect(result.content).toEqual('String')
    expect(result.userId).toEqual(scenario.comment.two.userId)
    expect(result.documentId).toEqual(scenario.comment.two.documentId)
  })

  scenario('updates a comment', async (scenario) => {
    const original = await comment({ id: scenario.comment.one.id })
    const result = await updateComment({
      id: original.id,
      input: { content: 'String2' },
    })

    expect(result.content).toEqual('String2')
  })

  scenario('deletes a comment', async (scenario) => {
    const original = await deleteComment({
      id: scenario.comment.one.id,
    })
    const result = await comment({ id: original.id })

    expect(result).toEqual(null)
  })
})
