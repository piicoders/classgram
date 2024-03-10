import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Document/DocumentsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_DOCUMENT_MUTATION = gql`
  mutation DeleteDocumentMutation($id: Int!) {
    deleteDocument(id: $id) {
      id
    }
  }
`

const DocumentsList = ({ documents }) => {
  const [deleteDocument] = useMutation(DELETE_DOCUMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Document deleted')
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
    if (confirm('Are you sure you want to delete document ' + id + '?')) {
      deleteDocument({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Content</th>
            <th>Handed</th>
            <th>Activity id</th>
            <th>Student id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr key={document.id}>
              <td>{truncate(document.id)}</td>
              <td>{truncate(document.content)}</td>
              <td>{timeTag(document.handed)}</td>
              <td>{truncate(document.activityId)}</td>
              <td>{truncate(document.studentId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.document({ id: document.id })}
                    title={'Show document ' + document.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editDocument({ id: document.id })}
                    title={'Edit document ' + document.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete document ' + document.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(document.id)}
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

export default DocumentsList
