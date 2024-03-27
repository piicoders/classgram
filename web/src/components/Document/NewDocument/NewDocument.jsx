import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DocumentForm from 'src/components/Document/DocumentForm'

const CREATE_DOCUMENT_MUTATION = gql`
  mutation CreateDocumentMutation($input: CreateDocumentInput!) {
    createDocument(input: $input) {
      id
    }
  }
`

const NewDocument = () => {
  const [createDocument, { loading, error }] = useMutation(
    CREATE_DOCUMENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Document created')
        navigate(routes.documents())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createDocument({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Document</h2>
      </header>
      <div className="rw-segment-main">
        <DocumentForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewDocument
