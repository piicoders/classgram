import { routes, NavLink } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

import 'src/lib/formatters'

const Classroom = ({ classroom }) => {
  const { currentUser } = useAuth()

  return (
    <>
      <Metadata title={classroom.name} />
      <div className="h-25 flex w-full flex-col rounded-lg bg-blue-900 p-4 text-white shadow">
        <h2 className="mb-10 mt-0 text-2xl font-bold text-white">
          {classroom.name}
        </h2>
        <div className="mt-auto flex items-center justify-between">
          <span>Professor(a): {classroom.professor.name}</span>
          <span>Código: {classroom.code}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-5 flex items-center justify-between rounded-lg border border-gray-300 px-6 py-4">
          <div className="flex gap-4">
            <NavLink
              exact
              to={routes.activities({ classId: classroom.id })}
              activeClassName="text-cyan-600 underline transition duration-300 hover:text-gray-900 font-bold"
              className="text-gray-700 transition duration-300 hover:text-gray-900"
            >
              Atividades
            </NavLink>
            {currentUser.roles === 'P' && (
              <NavLink
                to={routes.users({ classId: classroom.id })}
                activeClassName="text-cyan-600 underline transition duration-300 hover:text-gray-900 font-bold"
                className="text-gray-700 transition duration-300 hover:text-gray-900"
              >
                Alunos
              </NavLink>
            )}
          </div>
          {currentUser.roles === 'P' && (
            <NavLink
              to={routes.newActivity({ classId: classroom.id })}
              className="rw-button rw-button-green"
            >
              <div className="rw-button-icon">+</div> Nova Atividade
            </NavLink>
          )}
        </div>
      </div>
    </>
  )
}

export default Classroom
