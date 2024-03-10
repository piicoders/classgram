import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Subfactor/SubfactorsCell'
import { truncate } from 'src/lib/formatters'

const DELETE_SUBFACTOR_MUTATION = gql`
  mutation DeleteSubfactorMutation($id: Int!) {
    deleteSubfactor(id: $id) {
      id
    }
  }
`

const SubfactorsList = ({ subfactors }) => {
  const [deleteSubfactor] = useMutation(DELETE_SUBFACTOR_MUTATION, {
    onCompleted: () => {
      toast.success('Subfactor deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete subfactor ' + id + '?')) {
      deleteSubfactor({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Criterion id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {subfactors.map((subfactor) => (
            <tr key={subfactor.id}>
              <td>{truncate(subfactor.id)}</td>
              <td>{truncate(subfactor.description)}</td>
              <td>{truncate(subfactor.criterionId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.subfactor({ id: subfactor.id })}
                    title={'Show subfactor ' + subfactor.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editSubfactor({ id: subfactor.id })}
                    title={'Edit subfactor ' + subfactor.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete subfactor ' + subfactor.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(subfactor.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SubfactorsList
