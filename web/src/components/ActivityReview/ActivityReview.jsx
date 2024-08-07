import React, { useEffect, useState, useRef } from 'react'

import { XIcon } from '@heroicons/react/outline'

import { Form, Submit } from '@redwoodjs/forms'
import { useQuery, gql } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useAuth } from 'src/auth'

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
    }
  }
`

const COUNT_ERRORS_BY_CRITERION = gql`
  query CountErrorsByCriterion($documentId: Int!) {
    countErrorsByCriterion(documentId: $documentId) {
      name
      count
    }
  }
`
const UPDATE_DOCUMENT_MARK = gql`
  mutation UpdateDocumentMarkMutation(
    $subFactorsMark: String!
    $mark: Int!
    $documentId: Int!
  ) {
    updateMarkByDocumentId(
      subFactorsMark: $subFactorsMark
      mark: $mark
      id: $documentId
    ) {
      id
    }
  }
`

const ActivityReview = ({ documentId, onClose }) => {
  const [countErrors, setCountErrors] = useState([])
  const [marks, setMarks] = useState({})
  const [comment, setComment] = useState('')
  const [totalMarks, setTotalMarks] = useState(0)
  const modalRef = useRef(null)
  const commentTextAreaRef = useRef(null)
  const { currentUser } = useAuth()
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const { loading, error, data } = useQuery(COUNT_ERRORS_BY_CRITERION, {
    variables: { documentId: parseInt(documentId) },
  })

  useEffect(() => {
    let total = 0
    Object.values(marks).forEach((value) => {
      total += parseInt(value) || 0
    })
    setTotalMarks(total)
  }, [marks])

  useEffect(() => {
    if (!loading && !error && data && data.countErrorsByCriterion) {
      setCountErrors(data.countErrorsByCriterion)
    } else if (error) {
      console.error('Erro:', error)
    }
  }, [loading, error, data])

  const handleMarkChange = (criterionName, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [criterionName]: value,
    }))
  }

  const handleSubmit = () => {
    const stringifyMarks = JSON.stringify(marks)
    const input = {
      content: comment,
      userId: currentUser.id,
      documentId: documentId,
    }
    createComment({ variables: { input }})

    updateDocumentMark({
      variables: {
        subFactorsMark: stringifyMarks,
        mark: totalMarks,
        documentId,
      },
    })

    if (!updateLoading & !createLoading) onClose()
  }

  const [createComment, { createLoading, _createError }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      onCompleted: () => {
      },
      onError: (_createError) => {
        toast.error(_createError.message)
      },
    }
  )

  const [updateDocumentMark, { updateLoading, updateError }] = useMutation(
    UPDATE_DOCUMENT_MARK,
    {
      onCompleted: () => {
        toast.success('Nota inserida com sucesso')
      },
      onError: (updateError) => {
        toast.error(updateError.message)
      },
    }
  )
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div
        ref={modalRef}
        className="modal-content relative max-h-[80vh] w-96 overflow-y-auto rounded-lg bg-white p-6 shadow-lg"
      >
        <button
          className="absolute right-2 top-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={onClose}
        >
          <XIcon className="h-6 w-6" />
        </button>
        <h2 className="mb-4 text-lg font-semibold">Avaliação</h2>
        <Form onSubmit={handleSubmit}>
        <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold">Comentário final:</h3>
            <textarea
              name="comment"
              className="h-16 w-full resize-none overflow-hidden rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              placeholder="Digite o comentário aqui..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              ref={commentTextAreaRef}
            ></textarea>
          </div>
          {countErrors.map(({ name, count }) => (
            <div key={name} className="mb-6">
              <h3 className="mb-2 text-lg font-semibold">{name}</h3>
              <div className="flex items-center">
                <span className="mr-2 text-gray-600">Erros:</span>
                <span className="font-semibold text-red-500">{count}</span>
              </div>
              <input
                type="number"
                name={name}
                min="0"
                max="200"
                step="20"
                value={marks[name] || ''}
                onChange={(e) => handleMarkChange(name, e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>
          ))}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Nota Total: {totalMarks}</h3>
          </div>
          <Submit
            className="mt-4 w-full rounded-lg bg-blue-800 hover:bg-blue-500 px-4 py-2 text-white"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </Submit>
        </Form>
      </div>
    </div>
  )
}

export default ActivityReview
