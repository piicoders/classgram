import Correction from 'src/components/Correction/Correction'

export const QUERY = gql`
  query FindCorrectionById($id: Int!) {
    correction: correction(id: $id) {
      id
      from
      to
      description
      professorId
      subfactorId
      documentId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Correction not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ correction }) => {
  return <Correction correction={correction} />
}
