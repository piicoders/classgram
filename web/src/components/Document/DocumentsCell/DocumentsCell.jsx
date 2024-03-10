import { Link, routes } from '@redwoodjs/router'

import Documents from 'src/components/Document/Documents'

export const QUERY = gql`
  query FindDocuments {
    documents {
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
  return (
    <div className="rw-text-center">
      {'No documents yet. '}
      <Link to={routes.newDocument()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ documents }) => {
  return <Documents documents={documents} />
}
