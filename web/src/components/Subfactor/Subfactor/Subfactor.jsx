import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import 'src/lib/formatters'

const DELETE_SUBFACTOR_MUTATION = gql`
  mutation DeleteSubfactorMutation($id: Int!) {
    deleteSubfactor(id: $id) {
      id
    }
  }
`

const Subfactor = ({ subfactor }) => {
  const [deleteSubfactor] = useMutation(DELETE_SUBFACTOR_MUTATION, {
    onCompleted: () => {
      toast.success('Subfactor deleted')
      navigate(routes.subfactors())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete subfactor ' + id + '?')) {
      deleteSubfactor({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Subfactor {subfactor.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{subfactor.id}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{subfactor.description}</td>
            </tr>
            <tr>
              <th>Criterion id</th>
              <td>{subfactor.criterionId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editSubfactor({ id: subfactor.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(subfactor.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Subfactor
