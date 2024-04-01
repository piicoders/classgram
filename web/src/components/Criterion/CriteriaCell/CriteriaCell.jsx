import { Link, routes } from '@redwoodjs/router'

import Criteria from 'src/components/Criterion/Criteria'

export const QUERY = gql`
  query FindCriteria {
    criteria {
      id
      name
      promptId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No criteria yet. '}
      <Link to={routes.newCriterion()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ criteria }) => {
  return <Criteria criteria={criteria} />
}
