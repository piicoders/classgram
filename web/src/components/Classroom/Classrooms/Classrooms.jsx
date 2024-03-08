import { Link, routes } from '@redwoodjs/router'

const ClassroomsList = ({ classrooms }) => {
  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      {classrooms.map((classroom) => (
        <div key={classroom.id} className="rounded-md bg-slate-400">
          <Link
            className="cursor-pointer p-4"
            to={routes.classroom({ id: classroom.id })}
          >
            <h1 className="text-lg font-bold">{classroom.name}</h1>
            <p>Class code:</p>
            <span className="inline-flex items-center rounded-md bg-blue-300 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {classroom.code}
            </span>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ClassroomsList
