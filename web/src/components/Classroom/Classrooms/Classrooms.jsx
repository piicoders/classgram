import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

const ClassroomsList = ({ classrooms }) => {
  const { currentUser } = useAuth()

  return (
    <div className="grid grid-cols-4 gap-4">
      {classrooms.map((classroom) => (
        <div
          key={classroom.id}
          className="flex flex-col overflow-hidden rounded-md border shadow-md"
        >
          <div className="flex h-40 flex-col justify-center bg-blue-950/85 p-4 transition-all hover:bg-blue-900/85">
            <Link to={routes.activities({ classId: classroom.id })}>
              <h1 className="mb-2 text-lg font-bold text-white">
                {classroom.name}
              </h1>
              {currentUser?.roles === 'S' && (
                <p className="mb-4 truncate text-white/60">
                  {classroom.professor.name}
                </p>
              )}
            </Link>
          </div>
          <div className="bg-white p-4">
            <ul className="m-0 list-none p-0">
              {classroom.Activity?.slice(0, 4).map((activity) => {
                const dueDate = new Date(activity.dueDate)
                const isPast = dueDate < new Date() // Verifica se a data já passou

                return (
                  <li key={activity.id} className="mb-2 truncate">
                    <Link
                      to={routes.activity({
                        classId: classroom.id,
                        activityId: activity.id,
                      })}
                    >
                      <span
                        className={`mr-2 ${
                          isPast ? 'text-red-500' : 'text-blue-700'
                        }`}
                      >
                        {dueDate.toLocaleDateString('pt-BR', {
                          day: 'numeric',
                          month: 'numeric',
                        })}{' '}
                        -{' '}
                        <span
                          className={`${
                            isPast ? 'text-red-500' : 'text-blue-700'
                          }`}
                        >
                          {dueDate.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </span>
                      <span className="mr-2 text-gray-700 hover:underline hover:decoration-1">
                        {activity.name}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="mt-auto flex w-full justify-end border py-2 text-center">
            <Link to={routes.activities({ classId: classroom.id })}>
              <div className="mr-2 rounded-full p-2 transition-all hover:bg-blue-500/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#40446c"
                  className="bi bi-journals"
                  viewBox="0 0 16 16"
                >
                  <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2" />
                  <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ClassroomsList
