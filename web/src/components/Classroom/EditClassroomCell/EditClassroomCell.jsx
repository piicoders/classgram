import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ClassroomForm from 'src/components/Classroom/ClassroomForm'

export const QUERY = gql`
  query EditClassroomById($id: Int!) {
    classroom: classroom(id: $id) {
      id
      name
      code
      professorId
    }
  }
`

const UPDATE_CLASSROOM_MUTATION = gql`
  mutation UpdateClassroomMutation($id: Int!, $input: UpdateClassroomInput!) {
    updateClassroom(id: $id, input: $input) {
      id
      name
      code
      professorId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ classroom }) => {
  const [updateClassroom, { loading, error }] = useMutation(
    UPDATE_CLASSROOM_MUTATION,
    {
      onCompleted: () => {
        toast.success('Classroom updated')
        navigate(routes.classrooms())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateClassroom({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Classroom {classroom?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ClassroomForm
          classroom={classroom}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
