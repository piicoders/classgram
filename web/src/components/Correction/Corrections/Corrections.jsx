import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Correction/CorrectionsCell'
import { truncate } from 'src/lib/formatters'

const DELETE_CORRECTION_MUTATION = gql`
  mutation DeleteCorrectionMutation($id: Int!) {
    deleteCorrection(id: $id) {
      id
    }
  }
`

const CorrectionsList = ({ corrections }) => {
  const [deleteCorrection] = useMutation(DELETE_CORRECTION_MUTATION, {
    onCompleted: () => {
      toast.success('Correction deleted')
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
    if (confirm('Are you sure you want to delete correction ' + id + '?')) {
      deleteCorrection({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>From</th>
            <th>To</th>
            <th>Description</th>
            <th>Professor id</th>
            <th>Subfactor id</th>
            <th>Document id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {corrections.map((correction) => (
            <tr key={correction.id}>
              <td>{truncate(correction.id)}</td>
              <td>{truncate(correction.from)}</td>
              <td>{truncate(correction.to)}</td>
              <td>{truncate(correction.description)}</td>
              <td>{truncate(correction.professorId)}</td>
              <td>{truncate(correction.subfactorId)}</td>
              <td>{truncate(correction.documentId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.correction({ id: correction.id })}
                    title={'Show correction ' + correction.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCorrection({ id: correction.id })}
                    title={'Edit correction ' + correction.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete correction ' + correction.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(correction.id)}
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

export default CorrectionsList
