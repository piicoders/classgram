import { useState } from 'react'

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
    <div className="max-w-6xl mx-auto mt-8 px-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-10 py-0 flex items-start justify-between">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">{activity.name}</h2>
          <div className="flex items-center">
            <Link
              to={routes.editActivity({ activityId: activity.id, classId: activity.classroomId })}
              className="text-blue-500 hover:text-blue-700 mr-4"
            >
              Edit
            </Link>
            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={() => onDeleteClick(activity.id)}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="px-8 py-4 bg-gray-100 border-t border-gray-200"></div>
        <div className="px-10 py-8">
          <p className="text-gray-600 text-lg mb-4">Created at: {timeTag(activity.createdAt)}</p>
          <p className="text-gray-600 text-lg mb-4">Due date: {timeTag(activity.dueDate)}</p>
          <p className="text-gray-600 text-lg mb-4">Description: {activity.description}</p>
          <textarea
            className="w-full h-96 px-3 py-2 text-base border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            value={response}
            onChange={handleChange}
            placeholder="Digite sua resposta aqui..."
          ></textarea>
          <div className="mt-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
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
