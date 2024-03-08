import { Link, routes } from '@redwoodjs/router'

import Classrooms from 'src/components/Classroom/Classrooms'

export const QUERY = gql`
  query FindProfessorClasses($professorId: String!) {
    professorClasses(professorId: $professorId) {
      id
      name
      code
      professor {
        email
        name
      }
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

export const Success = ({ professorClasses }) => {
  console.log(professorClasses)
  console.log('testes')
  return <Classrooms classrooms={professorClasses} />
}
