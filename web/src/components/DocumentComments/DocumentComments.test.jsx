import { render } from '@redwoodjs/testing/web'

import DocumentComments from './DocumentComments'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DocumentComments', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DocumentComments />)
    }).not.toThrow()
  })
})
