import { Link, routes } from '@redwoodjs/router'

import Activities from 'src/components/Activity/Activities'

export const QUERY = gql`
  query FindActivities {
    activities {
      id
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
  return (
    <div className="rw-text-center">
      {'No activities yet. '}
      <Link to={routes.newActivity()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ activities }) => {
  return <Activities activities={activities} />
}
