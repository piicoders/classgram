import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import ClassroomsCell from 'src/components/Classroom/ClassroomsCell'

const ClassroomsPage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <Metadata title="Classrooms" />
      <ClassroomsCell professorId={currentUser.id} />
    </>
  )
}

export default ClassroomsPage
