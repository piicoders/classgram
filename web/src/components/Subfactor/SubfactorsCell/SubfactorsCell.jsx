import { Link, routes } from '@redwoodjs/router'

import Subfactors from 'src/components/Subfactor/Subfactors'

export const QUERY = gql`
  query FindSubfactors {
    subfactors {
      id
      description
      criterionId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No subfactors yet. '}
      <Link to={routes.newSubfactor()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ subfactors }) => {
  return <Subfactors subfactors={subfactors} />
}
