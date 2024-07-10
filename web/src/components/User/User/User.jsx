import { Link, routes } from '@redwoodjs/router'

const User = ({ user }) => {
  return (
    <>
      {/* new */}
      <div className="mx-auto flex h-[512px] max-w-sm flex-col justify-between overflow-hidden rounded-lg border bg-white shadow-md">
        <div className="h-24 bg-blue-900"></div>

        <div className="p-4 text-center">
          <div className="mb-2 text-3xl font-bold">{user.name}</div>
          <div className="text-xl text-gray-600">{user.email}</div>
        </div>

        <div className="mx-4 mb-4 text-center">
          <hr className="my-6" />
          <Link
            to={routes.editUser({ id: user.id })}
            className="rounded-lg bg-blue-900 px-4 py-2 text-white"
          >
            Editar Perfil
          </Link>
        </div>
      </div>
    </>
  )
}

export default User
