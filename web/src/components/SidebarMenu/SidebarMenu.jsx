import React, { useState } from 'react'
import {
  FiFileText,
  FiBookOpen,
  FiEdit,
  FiMessageCircle,
  FiMenu,
} from 'react-icons/fi'
import { Link } from 'react-scroll'

const SidebarMenu = () => {
  const [isVisible, setIsVisible] = useState(true)

  const toggleSidebar = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div
      className={`fixed left-1 top-1/4 z-10 rounded-lg bg-blue-900/85 p-2 text-white shadow-md transition-transform duration-300 ${
        isVisible ? '' : '-translate-x-32'
      }`}
      onClick={toggleSidebar}
    >
      <h2
        className="mb-3 text-center text-lg font-bold"
      >
        Seções
      </h2>
      <ul className="space-y-2 text-sm">
        <li>
          <Link
            to="documentContent"
            smooth={true}
            duration={500}
            className="flex items-center space-x-2 rounded px-2 py-1 transition-colors duration-300 hover:bg-blue-700 hover:underline"
            role="menuitem"
            aria-label="Entrega"
          >
            <FiFileText />
            <span>- Entrega</span>
          </Link>
        </li>
        <li>
          <Link
            to="mark"
            smooth={true}
            duration={500}
            className="flex items-center space-x-2 rounded px-2 py-1 transition-colors duration-300 hover:bg-blue-700 hover:underline"
            role="menuitem"
            aria-label="Nota"
          >
            <FiBookOpen />
            <span>- Nota</span>
          </Link>
        </li>
        <li>
          <Link
            to="corrections"
            smooth={true}
            duration={500}
            className="flex items-center space-x-2 rounded px-2 py-1 transition-colors duration-300 hover:bg-blue-700 hover:underline"
            role="menuitem"
            aria-label="Correções"
          >
            <FiEdit />
            <span>- Correções</span>
          </Link>
        </li>
        <li>
          <Link
            to="comments"
            smooth={true}
            duration={500}
            className="flex items-center space-x-2 rounded px-2 py-1 transition-colors duration-300 hover:bg-blue-700 hover:underline"
            role="menuitem"
            aria-label="Comentários"
          >
            <FiMessageCircle />
            <span>- Comentários</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SidebarMenu
