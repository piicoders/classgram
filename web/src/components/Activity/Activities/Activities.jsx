import { timeTag, truncate } from 'src/lib/formatters'

const ActivitiesList = ({ activities }) => {
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
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {activities?.map((activity) => (
            <tr key={activity.id}>
              <td>{truncate(activity.id)}</td>
              <td>{truncate(activity.description)}</td>
              <td>{timeTag(activity.createdAt)}</td>
              <td>{timeTag(activity.dueDate)}</td>
              <td>{truncate(activity.maxSize)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ActivitiesList
