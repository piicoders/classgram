import Subfactor from 'src/components/Subfactor/Subfactor'

export const QUERY = gql`
  query FindSubfactorById($id: Int!) {
    subfactor: subfactor(id: $id) {
      id
      description
      criterionId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Subfactor not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ subfactor }) => {
  return <Subfactor subfactor={subfactor} />
}
