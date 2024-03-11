import { Link, routes } from '@redwoodjs/router'

import Users from 'src/components/User/Users'

export const QUERY = gql`
  query FindUsers {
    users {
      id
      email
      name
      hashedPassword
      salt
      type
      resetToken
      resetTokenExpiredAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No users yet. '}
      <Link to={routes.newUser()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ users }) => {
  return (
    <>
      <div className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <p className="rw-link">Users</p>
        </h1>
      </div>
      <Users users={users} />
    </>
  )
}
