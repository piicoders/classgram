import { useAuth } from 'src/auth'
import NewClassroom from 'src/components/Classroom/NewClassroom'

const NewClassroomPage = () => {
  const { currentUser } = useAuth()
  return <NewClassroom currentUser={currentUser} />
}

export default NewClassroomPage
