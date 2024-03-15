import { Link, routes, useParams } from '@redwoodjs/router'

import Activities from 'src/components/Activity/Activities'

export const QUERY = gql`
  query FindActivities {
    activities {
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
  const { classId } = useParams()
  return (
    <div className="rw-text-center">
      {'No activities yet. '}
      <Link to={routes.newActivity({ classId: classId })} className="rw-link">
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
