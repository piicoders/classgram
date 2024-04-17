import { render } from '@redwoodjs/testing/web'

import StudentDocument from './StudentDocument'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('StudentDocument', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StudentDocument />)
    }).not.toThrow()
  })
})
