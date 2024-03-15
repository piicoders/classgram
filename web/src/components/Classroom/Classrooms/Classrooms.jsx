import { Link, routes } from '@redwoodjs/router'

const ClassroomsList = ({ classrooms }) => {
  return (
    <div className="grid grid-cols-4 gap-4 text-center">
      {classrooms.map((classroom) => (
        <div key={classroom.id} className="rounded border">
          <Link
            className="cursor-pointerp-4"
            to={routes.activities({ classId: classroom.id })}
          >
            <div className="h-16 truncate rounded-md bg-slate-400 text-base">
              <h1 className="text-lg font-bold">{classroom.name}</h1>
              <h1 className="text-lg font-bold">{classroom.professor.name}</h1>
            </div>
          </Link>
          <div className="activities-section h-40 overflow-y-auto rounded bg-slate-200">
            <ul>
              {classroom.Activity?.slice(0, 5).map((activity) => (
                <Link
                  key={classroom.id}
                  to={routes.activity({
                    classId: classroom.id,
                    activityId: activity.id,
                  })}
                >
                  <li key={activity.id} className="mt-2 truncate text-base">
                    {`${new Date(activity.dueDate).getDate()}/${
                      new Date(activity.dueDate).getMonth() + 1
                    } - ${activity.name} - ${new Date(
                      activity.dueDate
                    ).getHours()}:${new Date(activity.dueDate).getMinutes()}h`}
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
