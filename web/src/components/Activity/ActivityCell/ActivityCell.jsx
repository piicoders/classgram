import Activity from 'src/components/Activity/Activity'

export const QUERY = gql`
  query FindActivityById($id: Int!) {
    activity: activity(id: $id) {
      id
      name
      description
      createdAt
      dueDate
      maxSize
      promptId
      classroomId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Activity not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ activity }) => {
  return <Activity activity={activity} />
}
