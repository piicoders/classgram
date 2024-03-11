import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ClassroomForm from 'src/components/Classroom/ClassroomForm/ClassroomForm'
import JoinClassForm from 'src/components/Classroom/ClassroomForm/JoinClassForm'

const CREATE_CLASSROOM_MUTATION = gql`
  mutation CreateClassroomMutation($input: CreateClassroomInput!) {
    createClassroom(input: $input) {
      id
    }
  }
`

const NewClassroom = ({ currentUser }) => {
  const [createClassroom, { loading, error }] = useMutation(
    CREATE_CLASSROOM_MUTATION,
    {
      onCompleted: () => {
        toast.success('Turma criada!')
        navigate(routes.classrooms())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createClassroom({ variables: { input } })
  }

  return (
    <>
      <Metadata title="Turmas" />
      {currentUser.type == 'P' ? (
        <div className="rw-segment">
          <header className="rw-segment-header">
            <h2 className="rw-heading rw-heading-secondary">New Classroom</h2>
          </header>
          <div className="rw-segment-main">
            <ClassroomForm
              professorID={currentUser.id}
              onSave={onSave}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      ) : (
        <JoinClassForm studentID={currentUser.id}>teste</JoinClassForm>
      )}
    </>
  )
}

export default NewClassroom
