import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Activity/ActivitiesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_ACTIVITY_MUTATION = gql`
  mutation DeleteActivityMutation($id: Int!) {
    deleteActivity(id: $id) {
      id
    }
  }
`

const ActivitiesList = ({ activities }) => {
  const [deleteActivity] = useMutation(DELETE_ACTIVITY_MUTATION, {
    onCompleted: () => {
      toast.success('Activity deleted')
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
    if (confirm('Are you sure you want to delete activity ' + id + '?')) {
      deleteActivity({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Created at</th>
            <th>Due date</th>
            <th>Max size</th>
            <th>Prompt id</th>
            <th>Classroom id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>{truncate(activity.id)}</td>
              <td>{truncate(activity.description)}</td>
              <td>{timeTag(activity.createdAt)}</td>
              <td>{timeTag(activity.dueDate)}</td>
              <td>{truncate(activity.maxSize)}</td>
              <td>{truncate(activity.promptId)}</td>
              <td>{truncate(activity.classroomId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.activity({ id: activity.id })}
                    title={'Show activity ' + activity.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editActivity({ id: activity.id })}
                    title={'Edit activity ' + activity.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete activity ' + activity.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(activity.id)}
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

export default ActivitiesList
