import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_ACTIVITY_MUTATION = gql`
  mutation DeleteActivityMutation($id: Int!) {
    deleteActivity(id: $id) {
      id
    }
  }
`

const Activity = ({ activity }) => {
  const [deleteActivity] = useMutation(DELETE_ACTIVITY_MUTATION, {
    onCompleted: () => {
      toast.success('Activity deleted')
      navigate(routes.activities())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete activity ' + id + '?')) {
      deleteActivity({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Activity {activity.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{activity.id}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{activity.description}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(activity.createdAt)}</td>
            </tr>
            <tr>
              <th>Due date</th>
              <td>{timeTag(activity.dueDate)}</td>
            </tr>
            <tr>
              <th>Max size</th>
              <td>{activity.maxSize}</td>
            </tr>
            <tr>
              <th>Prompt id</th>
              <td>{activity.promptId}</td>
            </tr>
            <tr>
              <th>Classroom id</th>
              <td>{activity.classroomId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editActivity({ id: activity.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(activity.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Activity
