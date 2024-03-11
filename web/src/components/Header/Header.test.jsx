import { render } from '@redwoodjs/testing/web'

import HeaderClassroom from './Header'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('HeaderClassroom', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HeaderClassroom />)
    }).not.toThrow()
  })
})
