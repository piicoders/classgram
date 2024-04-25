import { Link, routes, useParams } from '@redwoodjs/router'

import { truncate } from 'src/lib/formatters'

const DocumentsList = ({ documents }) => {
  const { classId } = useParams()

  return (
    <div className="overflow-x-auto">
      <table className="whitespace-no-wrap w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Resposta
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Data de Entrega
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Aluno
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              &nbsp;
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {documents.map((document) => (
            <tr key={document.id}>
              <td className="whitespace-normal px-6 py-4">
                {truncate(document.content)}
              </td>
              <td className="whitespace-normal px-6 py-4">
                {`${new Date(document.handed).getDate()}/${
                  new Date(document.handed).getMonth() + 1
                } - ${new Date(document.handed).getHours()}h`}
              </td>
              <td className="whitespace-normal px-6 py-4">
                {truncate(document.student.name)}
              </td>
              <td className="whitespace-normal px-6 py-4">
                <div className="flex items-center space-x-2">
                  <Link
                    to={routes.document({
                      id: document.id,
                      activityId: document.activityId,
                      classId: classId,
                    })}
                    title={'Ver entrega detalhada'}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Visualizar
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DocumentsList
