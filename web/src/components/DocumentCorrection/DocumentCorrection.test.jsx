import { render } from '@redwoodjs/testing/web'

import DocumentCorrection from './DocumentCorrection'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DocumentCorrection', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DocumentCorrection />)
    }).not.toThrow()
  })
})
