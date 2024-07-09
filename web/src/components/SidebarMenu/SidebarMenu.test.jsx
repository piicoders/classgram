import { render } from '@redwoodjs/testing/web'

import SidebarMenu from './SidebarMenu'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SidebarMenu', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SidebarMenu />)
    }).not.toThrow()
  })
})
