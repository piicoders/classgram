import { useParams } from '@redwoodjs/router'
import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import ActivitiesCell from 'src/components/Activity/ActivitiesCell'

const ActivitiesPage = () => {
  const { classId } = useParams()
  const { currentUser } = useAuth()
  return (
    <>
      <Metadata title="Atividades" />
      <div className="mb-5 flex items-center justify-between rounded-lg border border-gray-300 px-6 py-4">
        <div className="flex gap-4">
          <Link
            className={
              'text-cyan-600 underline transition duration-300 hover:text-gray-900'
            }
          >
            Atividades
          </Link>
          {currentUser.roles == 'P' ? (
            <Link
              className={
                'text-gray-700 transition duration-300 hover:text-gray-900 '
              }
              to={routes.users({ classId: classId })}
            >
              Alunos
            </Link>
          ) : (
            ''
          )}
        </div>
        {currentUser.roles == 'P' ? (
          <Link
            to={routes.newActivity({ classId: classId })}
            className="rw-button rw-button-green"
          >
            <div className="rw-button-icon">+</div> Nova Atividade
          </Link>
        ) : (
          ''
        )}
      </div>
      <ActivitiesCell classId={classId} />
    </>
  )
}

export default ActivitiesPage
