import Activities from 'src/components/Activity/Activities'

export const QUERY = gql`
  query FindActivityByClassId($classId: Int!) {
    activityByClassId(classId: $classId) {
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

export const Empty = () => {
  return <div className="rw-text-center">{'Sem atividades no momento.'}</div>
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ activityByClassId }) => {
  return <Activities activities={activityByClassId} />
}
