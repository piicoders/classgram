// components/Header/Header.js
import { useState } from 'react'

import { Menu } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/solid'

import { Link, routes } from '@redwoodjs/router'

const HeaderClassroom = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <header className="flex items-center justify-between bg-gray-800 px-6 py-4 text-white mb-5">
      <Link className="flex items-center" to={routes.home()}>
        <img src="/icon.png" alt="Classgram" className="mr-2 h-8 w-8" />
        <h1 className="text-xl font-semibold">Classgram</h1>
      </Link>
      <div className="flex items-center">
        <Menu as="div" className="relative">
          <Menu.Button className="focus:outline-none">
            <UserCircleIcon className="h-6 w-6" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-40 divide-y divide-gray-200 rounded bg-white shadow-lg outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex w-full items-center justify-between px-4 py-2 text-sm text-gray-800`}
                >
                  {userMenuOpen ? 'Logout' : 'Login'}
                </button>
              )}
            </Menu.Item>
            {userMenuOpen && (
              <Menu.Item>
                <button className="flex w-full items-center justify-between px-4 py-2 text-sm text-gray-800">
                  User Info
                </button>
              </Menu.Item>
            )}
          </Menu.Items>
        </Menu>
      </div>
    </header>
  )
}

export default HeaderClassroom
