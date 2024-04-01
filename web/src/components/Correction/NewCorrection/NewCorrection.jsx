import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import CorrectionForm from 'src/components/Correction/CorrectionForm'

const CREATE_CORRECTION_MUTATION = gql`
  mutation CreateCorrectionMutation($input: CreateCorrectionInput!) {
    createCorrection(input: $input) {
      id
    }
  }
`

const NewCorrection = () => {
  const [createCorrection, { loading, error }] = useMutation(
    CREATE_CORRECTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Correction created')
        navigate(routes.corrections())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createCorrection({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Correction</h2>
      </header>
      <div className="rw-segment-main">
        <CorrectionForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCorrection
