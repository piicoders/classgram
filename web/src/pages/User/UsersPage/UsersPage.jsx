import { useParams } from '@redwoodjs/router'
import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import UsersCell from 'src/components/User/UsersCell'

const UsersPage = () => {
  const { classId } = useParams()
  const { currentUser } = useAuth()
  return (
    <>
      <Metadata title="Alunos" />
      <div className="mb-5 flex items-center justify-between rounded-lg border border-gray-300 px-6 py-4">
        <div className="flex gap-4">
          <Link
            className={
              'text-gray-700 transition duration-300 hover:text-gray-900 '
            }
            to={routes.activities({ classId: classId })}
          >
            Atividades
          </Link>
          {currentUser.type == 'P' ? (
            <Link
              className={
                'text-cyan-600 underline transition duration-300 hover:text-gray-900'
              }
              to={routes.users({ classId: classId })}
            >
              Alunos
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
      <UsersCell classId={classId} />
    </>
  )
}

export default UsersPage
