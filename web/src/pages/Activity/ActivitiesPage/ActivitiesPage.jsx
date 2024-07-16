import { useParams } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import ActivitiesCell from 'src/components/Activity/ActivitiesCell'
import ClassroomPage from 'src/pages/Classroom/ClassroomPage/ClassroomPage'

const ActivitiesPage = () => {
  const { classId } = useParams()
  return (
    <>
      <Metadata title="Atividades" />
      <ClassroomPage id={classId} />
      <ActivitiesCell classId={classId} />
    </>
  )
}

export default ActivitiesPage
