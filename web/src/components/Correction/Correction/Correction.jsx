import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import 'src/lib/formatters'

const DELETE_CORRECTION_MUTATION = gql`
  mutation DeleteCorrectionMutation($id: Int!) {
    deleteCorrection(id: $id) {
      id
    }
  }
`

const Correction = ({ correction }) => {
  const [deleteCorrection] = useMutation(DELETE_CORRECTION_MUTATION, {
    onCompleted: () => {
      toast.success('Correction deleted')
      navigate(routes.corrections())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete correction ' + id + '?')) {
      deleteCorrection({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Correction {correction.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{correction.id}</td>
            </tr>
            <tr>
              <th>From</th>
              <td>{correction.from}</td>
            </tr>
            <tr>
              <th>To</th>
              <td>{correction.to}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{correction.description}</td>
            </tr>
            <tr>
              <th>Professor id</th>
              <td>{correction.professorId}</td>
            </tr>
            <tr>
              <th>Subfactor id</th>
              <td>{correction.subfactorId}</td>
            </tr>
            <tr>
              <th>Document id</th>
              <td>{correction.documentId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCorrection({ id: correction.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(correction.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Correction
