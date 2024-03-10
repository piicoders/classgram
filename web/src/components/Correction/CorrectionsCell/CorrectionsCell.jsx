import { Link, routes } from '@redwoodjs/router'

import Corrections from 'src/components/Correction/Corrections'

export const QUERY = gql`
  query FindCorrections {
    corrections {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No corrections yet. '}
      <Link to={routes.newCorrection()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ corrections }) => {
  return <Corrections corrections={corrections} />
}
