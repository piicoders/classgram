import { Link } from '@redwoodjs/router'

import { timeTag } from 'src/lib/formatters'

const Document = ({ document }) => {
  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Entrega de: {document.student.name}
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Resposta</th>
              <td>{document.content}</td>
            </tr>
            <tr>
              <th>Data de entrega</th>
              <td>{timeTag(document.handed)}</td>
            </tr>
            <tr>
              <th>Student name</th>
              <td>{document.student.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link className="rw-button rw-button-blue">Edit</Link>
        <button type="button" className="rw-button rw-button-red">
          Delete
        </button>
      </nav>
    </>
  )
}

export default Document
