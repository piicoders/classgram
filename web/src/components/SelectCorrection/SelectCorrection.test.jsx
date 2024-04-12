import { render } from '@redwoodjs/testing/web'

import SelectCorrection from './SelectCorrection'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SelectCorrection', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SelectCorrection />)
    }).not.toThrow()
  })
})
