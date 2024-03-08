import { Link, routes } from '@redwoodjs/router'

const ClassroomsList = ({ classrooms }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {classrooms.map((classroom) => (
        <Link
          key={classroom.id}
          className="cursor-pointer border p-4"
          to={routes.classroom({ id: classroom.id })}
        >
          <h1 className="text-center text-lg font-bold">{classroom.name}</h1>
          <p>{classroom.code}</p>
        </Link>
      ))}
    </div>
  )
}

export default ClassroomsList
