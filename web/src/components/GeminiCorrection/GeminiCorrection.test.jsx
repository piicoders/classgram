import { render } from '@redwoodjs/testing/web'

import GeminiCorrection from './GeminiCorrection'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GeminiCorrection', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GeminiCorrection />)
    }).not.toThrow()
  })
})
