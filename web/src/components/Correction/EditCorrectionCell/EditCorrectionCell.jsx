import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CorrectionForm from 'src/components/Correction/CorrectionForm'

export const QUERY = gql`
  query EditCorrectionById($id: Int!) {
    correction: correction(id: $id) {
      id
      text
      correct
      severity
      description
      professorId
      subfactorId
      documentId
    }
  }
`

const UPDATE_CORRECTION_MUTATION = gql`
  mutation UpdateCorrectionMutation($id: Int!, $input: UpdateCorrectionInput!) {
    updateCorrection(id: $id, input: $input) {
      id
      text
      correct
      severity
      description
      professorId
      subfactorId
      documentId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ correction }) => {
  const [updateCorrection, { loading, error }] = useMutation(
    UPDATE_CORRECTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Correction updated')
        navigate(routes.corrections())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateCorrection({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Correction {correction?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CorrectionForm
          correction={correction}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
