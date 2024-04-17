import { useState, useEffect } from 'react'

import { Link, routes, navigate, useParams } from '@redwoodjs/router'
import { useQuery, useMutation, gql } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import DocumentForm from 'src/components/Document/DocumentForm'
import StudentDocument from 'src/components/StudentDocument'

export const STUDENT_DOCUMENT = gql`
  query FindDocument($activityId: Int!, $studentId: String!) {
    findByActivityAndStudent(activityId: $activityId, studentId: $studentId) {
      id
      content
      handed
      Correction {
        id
        correct
        description
        text
        severity
        professor {
          name
        }
        subfactor {
          criterion {
            name
            prompt {
              description
            }
          }
          description
          name
        }
      }
    }
  }
`

const DELETE_ACTIVITY_MUTATION = gql`
  mutation DeleteActivityMutation($id: Int!) {
    deleteActivity(id: $id) {
      id
    }
  }
`

const Activity = ({ activity }) => {
  const { currentUser } = useAuth()
  const { activityId } = useParams()

  const { loading, error, data } = useQuery(STUDENT_DOCUMENT, {
    variables: { activityId: activityId, studentId: currentUser.id },
  })

  const [document, setDocument] = useState(null)

  useEffect(() => {
    if (!loading && !error && data.findByActivityAndStudent) {
      setDocument(data.findByActivityAndStudent)
    }
  }, [loading, error, data])

  const [deleteActivity] = useMutation(DELETE_ACTIVITY_MUTATION, {
    onCompleted: () => {
      toast.success('Atividade deletada')
      navigate(routes.activities({ classId: activity.classroomId }))
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Tem certeza que deseja deletar a atividade ' + id + '?')) {
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
          {currentUser.roles === 'P' && (
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
          )}
        </div>
        <div className="border-t border-gray-200 bg-gray-100 px-8 py-4"></div>
        <div className="px-8 py-4">
          <p className="mb-4 text-lg text-gray-600">{activity.description}</p>
          {currentUser.roles === 'S' &&
            (document ? (
              <div className="relative mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
                <StudentDocument
                  document={document}
                  title={'Sua Resposta'}
                  corrections={document.Correction}
                />
              </div>
            ) : (
              <DocumentForm
                maxSize={activity.maxSize}
                activityId={activity.id}
                currentUser={currentUser}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Activity
