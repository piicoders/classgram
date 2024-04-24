import { navigate, routes, useParams } from '@redwoodjs/router'
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
  const { classId } = useParams()
  const [createActivity, { loading, error }] = useMutation(
    CREATE_ACTIVITY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Activity created')
        navigate(routes.activities({ classId: classId }))
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
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Nova Atividade</h2>
      </header>
      <div className="rounded bg-white">
        <div className="p-6">
          <ActivityForm
            classId={classId}
            onSave={onSave}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  )
}

export default NewActivity
