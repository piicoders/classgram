import React, { useEffect, useState } from 'react'

import { Tooltip } from 'react-tooltip'

import { useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import ActivityReview from 'src/components/ActivityReview'

const COMMENT_BY_DOCUMENT_ID = gql`
  query CommentByDocumentId($documentId: Int!) {
    commentByDocumentId(documentId: $documentId) {
      id
      user {
        name
      }
      content
    }
  }
`

const formatDate = (date) => {
  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(date).toLocaleDateString('pt-BR', options)
}

const SidebarMenu = () => {
  return (
    <div className="fixed left-4 top-1/4 z-10 w-32 rounded-lg bg-blue-900/85 p-2 text-white shadow-md">
      <h2 className="mb-2 text-lg font-bold">Seções</h2>
      <ul className="space-y-1 text-sm">
        <li>
          <a href="#activity" className="hover:underline">
            - Atividade
          </a>
        </li>
        <li>
          <a href="#documentContent" className=" hover:underline">
            - Entrega
          </a>
        </li>
        <li>
          <a href="#mark" className=" hover:underline">
            - Nota
          </a>
        </li>
        <li>
          <a href="#corrections" className=" hover:underline">
            - Correções
          </a>
        </li>
        <li>
          <a href="#comments" className=" hover:underline">
            - Comentários
          </a>
        </li>
      </ul>
    </div>
  )
}

const getSeverityText = (severity) => {
  const severityMap = {
    G: 'Bom',
    N: 'Neutro',
    B: 'Ruim',
  }
  return severityMap[severity] || ''
}

const StudentDocument = ({ document, title, corrections }) => {
  const { currentUser } = useAuth()

  const [showModal, setShowModal] = useState(false)
  const [comments, setComments] = useState([])

  const { loading, error, data } = useQuery(COMMENT_BY_DOCUMENT_ID, {
    variables: { documentId: parseInt(document.id) },
  })

  useEffect(() => {
    if (!loading && !error && data.commentByDocumentId) {
      setComments(data.commentByDocumentId)
    }
  }, [loading, error, data])

  const handleModalOpen = () => {
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  const highlightCorrections = (content, corrections) => {
    corrections.forEach((correction) => {
      let color = ''
      switch (correction.severity) {
        case 'G':
          color = '#6df2a8'
          break
        case 'N':
          color = '#f5f578'
          break
        case 'B':
          color = '#f57a7a'
          break
        default:
          color = 'inherit'
      }

      const markStart = `<mark style="background-color: ${color};">`
      const markEnd = '</mark>'
      const regex = new RegExp(correction.text, 'gi')
      const text = `${
        correction.description ? `Descrição: ${correction.description}` : ''
      }<br />${correction.correct ? `Correção:${correction.correct}` : ''}`
      content = content.replace(
        regex,
        (match) =>
          `${markStart}<span data-id="${correction.id}" data-tooltip-id="tooltip-${correction.severity}" data-tooltip-html="${text}">${match}</span>${markEnd}`
      )
    })
    return content
  }

  const correctionsData = corrections.map((correction) => ({
    text: correction.text,
    id: correction.id,
    severity: correction.severity,
    description: correction.description,
    correct: correction.correct,
  }))

  const highlightedContent = highlightCorrections(
    document.content.replace(/\n/g, '<br>'),
    correctionsData
  )

  return (
    <>
      <SidebarMenu />
      <Tooltip id="tooltip-B" style={{ backgroundColor: 'rgb(180, 20, 20)' }} />
      <Tooltip id="tooltip-G" style={{ backgroundColor: 'rgb(0, 128, 0)' }} />
      <Tooltip
        id="tooltip-N"
        style={{ backgroundColor: 'rgb(255, 255, 0)', color: '#222' }}
      />
      {showModal && (
        <ActivityReview documentId={document.id} onClose={handleModalClose} />
      )}
      <div id="documentContent" className="mb-16">
        <h3 className="mb-2 flex items-center justify-between text-2xl font-semibold text-gray-800">
          {title}
          {currentUser.roles === 'P' && (
            <button
              onClick={handleModalOpen}
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              Avaliar
            </button>
          )}
        </h3>
        <p className="mb-2 text-sm text-gray-600">
          {formatDate(document.handed)}
        </p>
        <p
          id="documentContent"
          className="text-base"
          dangerouslySetInnerHTML={{ __html: highlightedContent }}
        ></p>
      </div>
      {document.mark != null ? (
        <>
          <hr id="mark" className="my-16 border-gray-300" />
          <div className="mb-4 text-gray-900">
            <h2 className="mb-2 text-3xl">
              <span className="border-l-4 border-blue-500 pl-2 font-bold">
                Nota: {document.mark}
              </span>
            </h2>
            <ul className="list-disc pl-8">
              {Object.entries(JSON.parse(document.subFactorsMark)).map(
                ([key, value]) => (
                  <li key={key} className="mb-2">
                    <span className="font-bold">{key}:</span> {value}
                  </li>
                )
              )}
            </ul>
          </div>
        </>
      ) : (
        ''
      )}
      {corrections.length ? (
        <>
          <hr id="corrections" className="my-16 border-gray-300" />
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            <span className="border-l-4 border-blue-500 pl-2">Correção</span>
          </h2>

          {corrections.map((correction) => (
            <div
              key={correction.id}
              className="mb-4 rounded-lg bg-white p-6 shadow-md"
            >
              <p>
                <span className="font-bold">Trecho:</span> {correction.text}
              </p>
              <p>
                <span className="font-bold">Descrição:</span>{' '}
                {correction.description}
              </p>
              {correction.correct && (
                <p>
                  <span className="font-bold">Correção:</span>{' '}
                  {correction.correct}
                </p>
              )}
              <p>
                <span className="font-bold">Severidade:</span>{' '}
                {getSeverityText(correction.severity)}
              </p>
            </div>
          ))}
        </>
      ) : (
        ''
      )}
      {comments.length ? (
        <>
          <hr id="comments" className="my-16 border-gray-300" />
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            <span className="border-l-4 border-blue-500 pl-2">Comentários</span>
          </h2>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="mb-4 rounded-lg bg-white p-6 shadow-md"
            >
              <h1 className="mb-4 text-2xl font-bold text-gray-900">
                {comment.user.name}:
              </h1>
              <p>{comment.content}</p>
            </div>
          ))}
        </>
      ) : (
        ''
      )}
    </>
  )
}

export default StudentDocument
