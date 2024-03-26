import { useState } from 'react'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const DELETE_ACTIVITY_MUTATION = gql`
  mutation DeleteActivityMutation($id: Int!) {
    deleteActivity(id: $id) {
      id
    }
  }
`

const Activity = ({ activity }) => {
  const { currentUser } = useAuth()

  const [deleteActivity] = useMutation(DELETE_ACTIVITY_MUTATION, {
    onCompleted: () => {
      toast.success('Activity deleted')
      navigate(routes.activities({ classId: activity.classroomId }))
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [response, setResponse] = useState('')

  const handleChange = (event) => {
    setResponse(event.target.value)
  }

  const handleSubmitResponse = () => {
    // Aqui você pode enviar a resposta para o servidor ou realizar qualquer outra ação necessária
    console.log('Resposta do aluno:', response)
    // Limpando o campo de resposta após enviar
    setResponse('')
    // Adicione aqui a lógica para enviar a resposta para o servidor
    toast.success('Resposta enviada com sucesso!')
  }

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete activity ' + id + '?')) {
      deleteActivity({ variables: { id } })
    }
  }

  return (
    <div className="mx-auto mt-8 max-w-6xl px-8">
      <div className="overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between px-10 py-0">
          <div className="flex flex-col">
            <h2 className="mb-2 text-3xl font-semibold text-gray-800">
              {activity.name}
            </h2>
            <p
              className={`mb-6 text-lg ${
                new Date(activity.dueDate) > new Date()
                  ? 'text-gray-600'
                  : 'text-red-600'
              }`}
            >
              Prazo:{' '}
              {`${new Date(activity.dueDate).getDate()}/${
                new Date(activity.dueDate).getMonth() + 1
              } - ${new Date(activity.dueDate).getHours()}:${new Date(
                activity.dueDate
              ).getMinutes()}h`}
            </p>
          </div>
          {currentUser.type == 'P' ? (
            <div className="flex items-center">
              <Link
                to={routes.documents({
                  activityId: activity.id,
                  classId: activity.classroomId,
                })}
                className="mr-4 text-neutral-950 hover:text-neutral-900"
              >
                Envios
              </Link>
              <Link
                to={routes.editActivity({
                  activityId: activity.id,
                  classId: activity.classroomId,
                })}
                className="mr-4 text-blue-500 hover:text-blue-700"
              >
                Editar
              </Link>
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => onDeleteClick(activity.id)}
              >
                Apagar
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="border-t border-gray-200 bg-gray-100 px-8 py-4"></div>
        <div className="px-8 py-4">
          <p className="mb-4 text-lg text-gray-600">{activity.description}</p>
          <textarea
            className="h-auto w-full resize-y rounded-lg border px-3 py-2 text-base focus:border-blue-300 focus:outline-none focus:ring"
            value={response}
            onChange={handleChange}
            maxLength={activity.maxSize}
            placeholder="Digite sua resposta aqui..."
            rows={30}
          ></textarea>
          <div className="mt-4">
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick={handleSubmitResponse}
            >
              Enviar Resposta
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activity
