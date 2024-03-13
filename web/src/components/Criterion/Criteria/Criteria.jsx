import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Criterion/CriteriaCell'
import { truncate } from 'src/lib/formatters'

const DELETE_CRITERION_MUTATION = gql`
  mutation DeleteCriterionMutation($id: Int!) {
    deleteCriterion(id: $id) {
      id
    }
  }
`

const CriteriaList = ({ criteria }) => {
  const [deleteCriterion] = useMutation(DELETE_CRITERION_MUTATION, {
    onCompleted: () => {
      toast.success('Criterion deleted')
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
    if (confirm('Are you sure you want to delete criterion ' + id + '?')) {
      deleteCriterion({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Prompt id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((criterion) => (
            <tr key={criterion.id}>
              <td>{truncate(criterion.id)}</td>
              <td>{truncate(criterion.name)}</td>
              <td>{truncate(criterion.promptId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.criterion({ id: criterion.id })}
                    title={'Show criterion ' + criterion.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCriterion({ id: criterion.id })}
                    title={'Edit criterion ' + criterion.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete criterion ' + criterion.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(criterion.id)}
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

export default CriteriaList
