import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import ClassroomsCell from 'src/components/Classroom/ClassroomsCell'

const ClassroomsPage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <div className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <p className="rw-link">Classrooms</p>
        </h1>
        <Link to={routes.newClassroom()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Classroom
        </Link>
      </div>
      <Metadata title="Classrooms" />
      <ClassroomsCell userId={currentUser.id} />
    </>
  )
}

export default ClassroomsPage
