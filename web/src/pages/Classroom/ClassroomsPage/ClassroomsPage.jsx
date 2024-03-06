import { useAuth } from 'src/auth'
import ClassroomsCell from 'src/components/Classroom/ClassroomsCell'

const ClassroomsPage = () => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  return <ClassroomsCell professorId={currentUser.id} />
}

export default ClassroomsPage
