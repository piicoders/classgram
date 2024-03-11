import { Toaster } from '@redwoodjs/web/toast'

import HeaderClassroom from 'src/components/Classroom/HeaderClassroom/HeaderClassroom'

const ScaffoldLayout = ({ children }) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <HeaderClassroom />
      <main>{children}</main>
    </div>
  )
}

export default ScaffoldLayout
