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
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Metadata title="Turmas" />
      {currentUser.roles == 'P' ? (
        <div className="rounded bg-white">
          <div className="p-6">
            <header className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800">Nova Turma</h2>
            </header>
            <ClassroomForm
              professorID={currentUser.id}
              onSave={onSave}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      ) : (
        <div className="rounded bg-white">
          <div className="p-6">
            <header className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Entrar em uma Turma
              </h2>
            </header>
            <JoinClassForm studentID={currentUser.id}>teste</JoinClassForm>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewClassroom
