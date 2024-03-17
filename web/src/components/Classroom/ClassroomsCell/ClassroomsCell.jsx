import Classrooms from 'src/components/Classroom/Classrooms'

export const QUERY = gql`
  query FindClasses($userId: String!) {
    classes(userId: $userId) {
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
  return <div className="rw-text-center">{'Sem turmas ainda'}</div>
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ classes }) => {
  return <Classrooms classrooms={classes} />
}
