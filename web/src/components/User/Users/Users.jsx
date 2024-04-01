import { UserCircleIcon } from '@heroicons/react/solid'

const UsersList = ({ users }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-5">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center rounded-md bg-white p-4 shadow-md"
        >
          <div className="mr-4 flex-shrink-0">
            <UserCircleIcon className="h-8 w-8 text-blue-500" />
          </div>
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UsersList
