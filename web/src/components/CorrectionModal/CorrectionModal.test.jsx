import { render } from '@redwoodjs/testing/web'

import CorrectionModal from './CorrectionModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CorrectionModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CorrectionModal />)
    }).not.toThrow()
  })
})
