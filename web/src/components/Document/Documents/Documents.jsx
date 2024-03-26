import { Link, routes } from '@redwoodjs/router'

import { truncate } from 'src/lib/formatters'

const DocumentsList = ({ documents }) => {
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Resposta</th>
            <th>Data de Entrega</th>
            <th>Aluno</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr key={document.id}>
              <td>{truncate(document.content)}</td>
              <td>
                {`${new Date(document.handed).getDate()}/${
                  new Date(document.handed).getMonth() + 1
                } - ${new Date(document.handed).getMinutes()}h`}
              </td>
              <td>{truncate(document.student.name)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.document({ id: document.id })}
                    title={'Ver entrega detalhada'}
                    className="rw-button rw-button-small"
                  >
                    Visualizar
                  </Link>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DocumentsList
