import { render } from '@redwoodjs/testing/web'

import AutomaticCorrectionModal from './AutomaticCorrectionModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AutomaticCorrectionModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AutomaticCorrectionModal />)
    }).not.toThrow()
  })
})
