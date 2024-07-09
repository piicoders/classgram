import { format } from 'date-fns'
import { FaEye } from 'react-icons/fa'

import { Link, routes, useParams } from '@redwoodjs/router'

const DocumentsList = ({ documents }) => {
  const { classId } = useParams()

  return (
    <div className="divide-y divide-gray-200">
      {documents.map((document) => (
        <div
          key={document.id}
          className="py-4 transition duration-300 ease-in-out hover:bg-gray-50"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{document.student.name}</h3>
              <p className="text-sm text-gray-600">
                {format(new Date(document.handed), 'dd/MM/yyyy - HH:mm')}
              </p>
            </div>
            <div className="ml-4">
              <Link
                to={routes.document({
                  id: document.id,
                  activityId: document.activityId,
                  classId: classId,
                })}
                title={'Ver entrega detalhada'}
                className="flex items-center text-indigo-600 hover:text-indigo-900"
              >
                <FaEye className="mr-1" /> Visualizar
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DocumentsList
