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
            <div className="h-16 rounded-md bg-slate-400">
              <h1 className="text-lg font-bold">{classroom.name}</h1>
              <h1 className="text-lg font-bold">{classroom.professor.name}</h1>
            </div>
          </Link>
          <div className="activities-section h-40 overflow-y-auto rounded bg-slate-200">
            <h3 className="text-lg font-semibold">Atividades</h3>
            <ul>
              {classroom.activities?.map((activity) => (
                <li key={activity.id}>{activity.name}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ClassroomsList
