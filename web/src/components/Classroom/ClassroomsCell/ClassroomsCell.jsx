import { Link, routes } from '@redwoodjs/router'

import Classrooms from 'src/components/Classroom/Classrooms'

export const QUERY = gql`
  query FindClassrooms {
    classrooms {
      id
      name
      code
      professorId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No classrooms yet. '}
      <Link to={routes.newClassroom()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ classrooms }) => {
  return <Classrooms classrooms={classrooms} />
}
