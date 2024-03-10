import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import ActivityForm from 'src/components/Activity/ActivityForm'

const CREATE_ACTIVITY_MUTATION = gql`
  mutation CreateActivityMutation($input: CreateActivityInput!) {
    createActivity(input: $input) {
      id
    }
  }
`

const NewActivity = () => {
  const [createActivity, { loading, error }] = useMutation(
    CREATE_ACTIVITY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Activity created')
        navigate(routes.activities())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createActivity({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Activity</h2>
      </header>
      <div className="rw-segment-main">
        <ActivityForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewActivity
