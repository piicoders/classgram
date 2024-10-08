import { useState, useEffect, useRef } from 'react'

import { useMutation, gql } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AutomaticCorrectionModal from 'src/components/AutomaticCorrectionModal/AutomaticCorrectionModal'

const CREATE_DOCUMENT_MUTATION = gql`
  mutation CreateDocumentMutation($input: CreateDocumentInput!) {
    createDocument(input: $input) {
      id
    }
  }
`

const DocumentForm = (props) => {
  const [response, setResponse] = useState('')
  const textAreaRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (props.currentUser.roles === 'S') {
      textAreaRef.current.style.height = 'auto'
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
    }
  }, [response, props.currentUser.roles])

  const [createDocument] = useMutation(CREATE_DOCUMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Resposta enviada com sucesso!')
      window.location.reload()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleChange = (event) => {
    setResponse(event.target.value)
  }

  const handleSubmitResponse = () => {
    setLoading(true)
    const documentInput = {
      input: {
        content: response.trim(),
        handed: new Date().toISOString(),
        activityId: props.activityId,
        studentId: props.currentUser.id,
      },
    }

    setLoading(false)

    createDocument({ variables: documentInput })

    setResponse('')
  }

  return (
    <div>
      <textarea
        className="w-full resize-none overflow-auto rounded-lg border border-gray-300 p-3 text-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        value={response}
        onChange={handleChange}
        maxLength={props.maxSize}
        placeholder="Digite sua resposta aqui..."
        rows="5"
        ref={textAreaRef}
      ></textarea>
      <div className="mt-4 flex space-x-4">
        <button
          className="rounded bg-blue-800 px-4 py-2 text-white hover:bg-blue-500 disabled:bg-blue-300"
          onClick={handleSubmitResponse}
          disabled={!response.trim()}
        >
          {loading ? 'Enviando...' : 'Enviar Resposta'}
        </button>
        <button
          className="rounded bg-blue-800 px-4 py-2 text-white hover:bg-blue-500 disabled:bg-blue-300"
          onClick={handleOpenModal}
          disabled={!response.trim()}
        >
          Correção automática
        </button>
      </div>
      <AutomaticCorrectionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialTheme={props.theme}
        initialText={response}
      />
    </div>
  )
}

export default DocumentForm
