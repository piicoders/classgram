import { format } from 'date-fns'
import { Link, routes } from '@redwoodjs/router'

const ActivitiesList = ({ activities }) => {
  return (
    <div className="container mx-auto">
      {activities.map((activity) => (
        <Link
          key={activity.id}
          to={routes.activity({
            classId: activity.classroomId,
            activityId: activity.id,
          })}
        >
          <div className="my-4 w-full overflow-hidden rounded shadow-lg">
            <div className="px-6 py-4">
              <div className="mb-2 text-xl font-bold">{activity.name}</div>
              <p className="text-base text-gray-700">{activity.description}</p>
              <div className="text-right">
                <p
                  className={`text-base font-bold ${
                    new Date(activity.dueDate) > new Date()
                      ? 'text-indigo-900'
                      : 'text-red-600'
                  }`}
                >
                    {format(new Date(activity.dueDate), 'dd/MM/yyyy - HH:mm')}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ActivitiesList
