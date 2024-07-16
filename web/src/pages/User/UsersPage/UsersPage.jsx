import { useParams } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import UsersCell from 'src/components/User/UsersCell'
import ClassroomPage from 'src/pages/Classroom/ClassroomPage/ClassroomPage'

const UsersPage = () => {
  const { classId } = useParams()
  return (
    <>
      <Metadata title="Alunos" />
      <ClassroomPage id={classId} />
      <UsersCell classId={classId} />
    </>
  )
}

export default UsersPage
