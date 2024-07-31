import { render } from '@redwoodjs/testing/web'

import DocumentMark from './DocumentMark'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DocumentMark', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DocumentMark />)
    }).not.toThrow()
  })
})
