import { Link, routes } from '@redwoodjs/router'

const ClassroomsList = ({ classrooms }) => {
  return (
    <div className="grid grid-cols-4 gap-4 text-center">
      {classrooms.map((classroom) => (
        <div key={classroom.id} className="rounded border">
          <Link
            className="cursor-pointerp-4"
            to={routes.classroom({ id: classroom.id })}
          >
            <div className="h-16 rounded-md bg-slate-400 text-base truncate">
              <h1 className="text-lg font-bold">{classroom.name}</h1>
              <h1 className="text-lg font-bold">{classroom.professor.name}</h1>
            </div>
          </Link>
          <div className="activities-section h-40 overflow-y-auto rounded bg-slate-200">
            <ul>
              {classroom.Activity?.slice(0, 5).map((activity) => (
                <Link
                to={routes.activity({ classId: classroom.id, activityId: activity.id })}
                >
                  <li key={activity.id} className="text-base truncate mt-2">
                    {`${new Date(activity.dueDate).getDate()}/${new Date(activity.dueDate).getMonth() + 1} - ${activity.name} - ${new Date(activity.dueDate).getHours()}:${new Date(activity.dueDate).getMinutes()}h`}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ClassroomsList
