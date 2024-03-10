import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SubfactorForm from 'src/components/Subfactor/SubfactorForm'

export const QUERY = gql`
  query EditSubfactorById($id: Int!) {
    subfactor: subfactor(id: $id) {
      id
      description
      criterionId
    }
  }
`

const UPDATE_SUBFACTOR_MUTATION = gql`
  mutation UpdateSubfactorMutation($id: Int!, $input: UpdateSubfactorInput!) {
    updateSubfactor(id: $id, input: $input) {
      id
      description
      criterionId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ subfactor }) => {
  const [updateSubfactor, { loading, error }] = useMutation(
    UPDATE_SUBFACTOR_MUTATION,
    {
      onCompleted: () => {
        toast.success('Subfactor updated')
        navigate(routes.subfactors())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateSubfactor({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Subfactor {subfactor?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <SubfactorForm
          subfactor={subfactor}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
