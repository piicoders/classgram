import { gql } from '@apollo/client'

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
        toast.success('Turma criada com sucesso!')
        navigate(routes.classrooms())
      },
      onError: (error) => {
        toast.error(`Erro: ${error.message}`)
      },
    }
  )

  const onSave = (input) => {
    createClassroom({ variables: { input } })
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Metadata title="Criação de Turmas" />
      <div className="overflow-hidden rounded-lg bg-[#FOF3FA] shadow-md">
        <header className="border border-b bg-blue-900 p-2 text-center">
          <h2 className="text-2xl font-bold text-white">
            {currentUser.roles === 'P'
              ? 'Criar Nova Turma'
              : 'Entrar em uma Turma'}
          </h2>
        </header>
        <div className="p-4">
          {currentUser.roles === 'P' ? (
            <ClassroomForm
              professorID={currentUser.id}
              onSave={onSave}
              loading={loading}
              error={error}
            />
          ) : (
            <JoinClassForm studentID={currentUser.id} />
          )}
        </div>
      </div>
    </div>
  )
}

export default NewClassroom
