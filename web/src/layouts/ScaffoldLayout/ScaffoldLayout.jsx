import { Toaster } from '@redwoodjs/web/toast'

import Header from 'src/components/Header/Header'

const ScaffoldLayout = ({ children }) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default ScaffoldLayout
