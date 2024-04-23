import React, { useState } from 'react'

import ActivityReview from 'src/components/ActivityReview'

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

const MousePopup = ({ content, position, severity }) => {
  const getBorderColor = (severity) => {
    const borderColorMap = {
      G: 'border-4 border-green-500',
      N: 'border-4 border-yellow-500',
      B: 'border-4 border-red-500',
    }
    return borderColorMap[severity] || 'border-4 border-gray-500'
  }

  const borderColor = getBorderColor(severity)

  const adjustedPosition = {
    top: Math.min(position.y, window.innerHeight - 200),
    left: position.x,
  }

  return (
    <div
      className={`fixed border bg-white p-2 ${borderColor}`}
      style={adjustedPosition}
    >
      {content}
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
  const [showPopup, setShowPopup] = useState(false)
  const [popupContent, setPopupContent] = useState('')
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
  const [severity, setSeverity] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleModalOpen = () => {
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  const handleMouseOver = (event) => {
    const target = event.target
    if (target.tagName === 'SPAN' && target.dataset.text) {
      const description =
        target.dataset.description || 'Descrição não disponível'
      const position = { x: event.clientX, y: event.clientY }
      const correction = target.dataset.correction
      const severity = target.dataset.severity
      setPopupContent(
        <div>
          <p>
            <strong>Descrição:</strong> {description}
          </p>
          {correction != null && (
            <p>
              <strong>Correção:</strong> {correction}
            </p>
          )}
        </div>
      )
      setPopupPosition(position)
      setShowPopup(true)
      setSeverity(severity)
    }
  }

  const handleMouseOut = () => {
    setShowPopup(false)
  }

  const handleFocus = () => {
    setShowPopup(true)
  }

  const handleBlur = () => {
    setShowPopup(false)
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
      content = content.replace(
        regex,
        (match) =>
          `${markStart}<span data-id="${correction.id}" data-text="${correction.text}" data-correction="${correction.correct}" data-description="${correction.description}" data-severity="${correction.severity}">${match}</span>${markEnd}`
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
      {showModal && (
        <ActivityReview documentId={document.id} onClose={handleModalClose} />
      )}
      {showPopup && (
        <MousePopup
          content={popupContent}
          position={popupPosition}
          severity={severity}
        />
      )}
      <div className="mb-16">
        <h3 className="mb-2 flex items-center justify-between text-2xl font-semibold text-gray-800">
          {title}
          <button
            onClick={handleModalOpen}
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Avaliar
          </button>
        </h3>

        <p className="mb-2 text-sm text-gray-600">
          {formatDate(document.handed)}
        </p>
        <p
          id="documentContent"
          className="text-base"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onFocus={handleFocus}
          onBlur={handleBlur}
          dangerouslySetInnerHTML={{ __html: highlightedContent }}
        ></p>
      </div>
      {document.mark != null ? (
        (<>
          <hr className="my-16 border-gray-300" />
          <h2 className="mb-4 text-3xl text-gray-900">
            <span className="border-l-4 font-bold border-blue-500 pl-2">Nota: </span>
            <span>{document.mark}</span>
            <h3>{document.subFactorsMark}</h3>

            <span>{}</span>
          </h2>

        </>) ) : (
          ''
      )}
      {corrections.length ? (
        <>
          <hr className="my-16 border-gray-300" />
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
    </>
  )
}

export default StudentDocument
