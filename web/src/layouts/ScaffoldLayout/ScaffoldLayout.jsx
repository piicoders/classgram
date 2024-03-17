import { Toaster } from '@redwoodjs/web/toast'

import Header from 'src/components/Header/Header'

const ScaffoldLayout = ({ children }) => {
  return (
    <div>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Header />
      <main className="px-10 py-5">{children}</main>
    </div>
  )
}

export default ScaffoldLayout
