import Users from 'src/components/User/Users'

export const QUERY = gql`
  query FindClassStudents($classId: Int!) {
    classStudents(id: $classId) {
      id
      email
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <div className="rw-text-center">{'Sem alunos no momento'}</div>
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ classStudents }) => {
  return <Users users={classStudents} />
}
