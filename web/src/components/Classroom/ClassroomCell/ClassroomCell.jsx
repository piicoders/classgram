import Classroom from 'src/components/Classroom/Classroom'

export const QUERY = gql`
  query FindClassroomById($id: Int!) {
    classroom: classroom(id: $id) {
      id
      name
      code
      professor {
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Classroom not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ classroom }) => {
  return <Classroom classroom={classroom} />
}
