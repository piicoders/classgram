import { Link } from '@redwoodjs/router'

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
              <td>
                {`${new Date(document.handed).getDate()}/${
                  new Date(document.handed).getMonth() + 1
                } - ${new Date(document.handed).getMinutes()}h`}
              </td>
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
