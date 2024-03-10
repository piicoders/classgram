import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CriterionForm from 'src/components/Criterion/CriterionForm'

export const QUERY = gql`
  query EditCriterionById($id: Int!) {
    criterion: criterion(id: $id) {
      id
      name
      promptId
    }
  }
`

const UPDATE_CRITERION_MUTATION = gql`
  mutation UpdateCriterionMutation($id: Int!, $input: UpdateCriterionInput!) {
    updateCriterion(id: $id, input: $input) {
      id
      name
      promptId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ criterion }) => {
  const [updateCriterion, { loading, error }] = useMutation(
    UPDATE_CRITERION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Criterion updated')
        navigate(routes.criteria())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateCriterion({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Criterion {criterion?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CriterionForm
          criterion={criterion}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
