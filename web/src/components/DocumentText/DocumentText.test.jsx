import { render } from '@redwoodjs/testing/web'

import DocumentText from './DocumentText'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DocumentText', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DocumentText />)
    }).not.toThrow()
  })
})
