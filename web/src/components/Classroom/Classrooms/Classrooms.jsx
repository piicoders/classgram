import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

const ClassroomsList = ({ classrooms }) => {
  const { currentUser } = useAuth()

  return (
    <div className="grid grid-cols-4 gap-4">
      {classrooms.map((classroom) => (
        <div key={classroom.id} className="overflow-hidden rounded-md border">
          <div className="flex h-40 flex-col justify-center bg-gray-200 p-4">
            <Link to={routes.activities({ classId: classroom.id })}>
              <h1 className="mb-2 text-center text-lg font-bold text-gray-800">
                {classroom.name}
              </h1>
              {currentUser?.roles == 'S' && (
                <p className="mb-4 truncate text-center text-gray-600">
                  Professor: {classroom.professor.name}
                </p>
              )}
            </Link>
          </div>
          <div className="bg-white p-4">
            <ul className="m-0 list-none p-0">
              {classroom.Activity?.slice(0, 5).map((activity) => (
                <li key={activity.id} className="mb-2 truncate">
                  <Link
                    to={routes.activity({
                      classId: classroom.id,
                      activityId: activity.id,
                    })}
                  >
                    <span className="mr-2 text-gray-700">
                      {new Date(activity.dueDate).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'short',
                      })}{' '}
                      -
                    </span>
                    <span className="mr-2 text-gray-700">
                      {activity.name} -
                    </span>
                    <span className="text-gray-700">
                      {new Date(activity.dueDate).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ClassroomsList
