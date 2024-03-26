import Documents from 'src/components/Document/Documents'

export const QUERY = gql`
  query FindDocuments($activityId: Int!) {
    findByActivity(activityId: $activityId) {
      id
      content
      handed
      activityId
      studentId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <div className="rw-text-center">{'Nenhum envio no momento.'}</div>
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ findByActivity }) => {
  return <Documents documents={findByActivity} />
}
