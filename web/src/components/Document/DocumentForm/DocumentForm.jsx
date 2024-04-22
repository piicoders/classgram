import { useState, useEffect, useRef } from 'react'

import { useMutation, gql } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

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
    const documentInput = {
      input: {
        content: response.trim(),
        handed: new Date().toISOString(),
        activityId: props.activityId,
        studentId: props.currentUser.id,
      },
    }

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
      <div className="mt-4">
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
          onClick={handleSubmitResponse}
          disabled={!response.trim()}
        >
          Enviar Resposta
        </button>
      </div>
    </div>
  )
}

export default DocumentForm
