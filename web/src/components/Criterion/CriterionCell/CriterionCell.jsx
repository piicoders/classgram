import Criterion from 'src/components/Criterion/Criterion'

export const QUERY = gql`
  query FindCriterionById($id: Int!) {
    criterion: criterion(id: $id) {
      id
      name
      promptId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Criterion not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ criterion }) => {
  return <Criterion criterion={criterion} />
}
