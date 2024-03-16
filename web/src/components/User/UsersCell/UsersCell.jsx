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
  return <div className="rw-text-center">{'No users yet. '}</div>
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ users }) => {
  return <Users users={users} />
}
