import { render } from '@redwoodjs/testing/web'

import GptCorrection from './GptCorrection'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GptCorrection', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GptCorrection />)
    }).not.toThrow()
  })
})
