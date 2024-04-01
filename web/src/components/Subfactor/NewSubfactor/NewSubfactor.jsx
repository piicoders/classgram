import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import SubfactorForm from 'src/components/Subfactor/SubfactorForm'

const CREATE_SUBFACTOR_MUTATION = gql`
  mutation CreateSubfactorMutation($input: CreateSubfactorInput!) {
    createSubfactor(input: $input) {
      id
    }
  }
`

const NewSubfactor = () => {
  const [createSubfactor, { loading, error }] = useMutation(
    CREATE_SUBFACTOR_MUTATION,
    {
      onCompleted: () => {
        toast.success('Subfactor created')
        navigate(routes.subfactors())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createSubfactor({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Subfactor</h2>
      </header>
      <div className="rw-segment-main">
        <SubfactorForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewSubfactor
