import { Menu } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/solid'

import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

const HeaderClassroom = () => {
  const { currentUser, logOut } = useAuth()

  return (
    <header className="mb-5 flex items-center justify-between bg-gray-800 px-6 py-2 text-white">
      <Link className="flex items-center" to={routes.classrooms()}>
        <img src="/icon.png" alt="Classgram" className="mr-2 h-8 w-8" />
        <h1 className="text-xl font-semibold">Classgram</h1>
      </Link>
      <div className="flex items-center">
        <Menu as="div" className="relative">
          <Menu.Button className="focus:outline-none">
            <UserCircleIcon className="h-8 w-8" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-40 divide-y divide-gray-200 rounded bg-white shadow-lg outline-none">
            {currentUser && (
              <Menu.Item>
                <Link
                  to={routes.user({ id: currentUser.id })}
                  className="flex w-full items-center justify-between px-4 py-2 text-sm text-gray-800"
                >
                  User Info
                </Link>
              </Menu.Item>
            )}
            <Menu.Item>
              {currentUser ? (
                <button
                  className="flex w-full items-center justify-between bg-gray-100 px-4 py-2 text-sm text-gray-800"
                  type="button"
                  onClick={logOut}
                >
                  Logout
                </button>
              ) : (
                <Link
                  className="flex w-full items-center justify-between bg-gray-100 px-4 py-2 text-sm text-gray-800"
                  to={routes.login()}
                >
                  Login
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </header>
  )
}

export default HeaderClassroom
