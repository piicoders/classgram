import { useState } from 'react'

import { Tooltip } from 'react-tooltip'

import { useAuth } from 'src/auth'

import ActivityReview from '../ActivityReview/ActivityReview'

const DocumentText = ({ title, content, handed, corrections }) => {
  const { currentUser } = useAuth()
  const [showModal, setShowModal] = useState(false)

  const handleModalOpen = () => {
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

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

  const highlightCorrections = (content, corrections) => {
    corrections.forEach((correction) => {
      let color = ''
      switch (correction.severity) {
        case 'G':
          color = 'rgba(28, 205, 4, 0.7)'
          break
        case 'N':
          color = 'rgba(235, 186, 10, 0.7)'
          break
        case 'B':
          color = 'rgba(235, 44, 26, 0.7)'
          break
        default:
          color = 'inherit'
      }

      const markStart = `<mark style="background-color: ${color};">`
      const markEnd = '</mark>'
      const regex = new RegExp(correction.text, 'gi')
      const text = `${
        correction.description ? `Descrição: ${correction.description}` : ''
      }<br />${correction.correct ? `Correção: ${correction.correct}` : ''}`
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
    content.replace(/\n/g, '<br>'),
    correctionsData
  )

  return (
    <div>
      <Tooltip id="tooltip-B" style={{ backgroundColor: '#8C1E1E' }} />
      <Tooltip id="tooltip-G" style={{ backgroundColor: '#18712B' }} />
      <Tooltip
        id="tooltip-N"
        style={{ backgroundColor: '#FFDD57', color: '#222' }}
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
              className="focus:shadow-outline rounded bg-blue-800 px-4 py-2 font-bold text-white hover:bg-blue-500 focus:outline-none"
            >
              Avaliar
            </button>
          )}
        </h3>
        <p className="mb-2 text-sm text-gray-600">{formatDate(handed)}</p>
        <p
          id="documentContent"
          className="text-base"
          dangerouslySetInnerHTML={{ __html: highlightedContent }}
        ></p>
      </div>
    </div>
  )
}

export default DocumentText
