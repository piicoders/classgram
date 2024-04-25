import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ActivityForm from 'src/components/Activity/ActivityForm'

export const QUERY = gql`
  query EditActivityById($id: Int!) {
    activity: activity(id: $id) {
      id
      name
      description
      createdAt
      dueDate
      maxSize
      promptId
      classroomId
    }
  }
`

const UPDATE_ACTIVITY_MUTATION = gql`
  mutation UpdateActivityMutation($id: Int!, $input: UpdateActivityInput!) {
    updateActivity(id: $id, input: $input) {
      id
      name
      description
      createdAt
      dueDate
      maxSize
      promptId
      classroomId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ activity }) => {
  const [updateActivity, { loading, error }] = useMutation(
    UPDATE_ACTIVITY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Activity updated')
        navigate(routes.activities({ classId: activity.classroomId }))
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateActivity({ variables: { id, input } })
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Editar Atividade</h2>
      </header>
      <div className="rounded bg-white">
        <div className="p-6">
          <ActivityForm
            activity={activity}
            onSave={onSave}
            error={error}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}
