import { render } from '@redwoodjs/testing/web'

import ActivityReview from './ActivityReview'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ActivityReview', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ActivityReview />)
    }).not.toThrow()
  })
})
