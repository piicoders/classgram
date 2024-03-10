import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import CriterionForm from 'src/components/Criterion/CriterionForm'

const CREATE_CRITERION_MUTATION = gql`
  mutation CreateCriterionMutation($input: CreateCriterionInput!) {
    createCriterion(input: $input) {
      id
    }
  }
`

const NewCriterion = () => {
  const [createCriterion, { loading, error }] = useMutation(
    CREATE_CRITERION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Criterion created')
        navigate(routes.criteria())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createCriterion({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Criterion</h2>
      </header>
      <div className="rw-segment-main">
        <CriterionForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCriterion
