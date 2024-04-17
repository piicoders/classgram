import React, { useState } from 'react'

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
    switch (severity) {
      case 'G':
        return 'border-4 border-green-500'
      case 'N':
        return 'border-4 border-gray-500'
      case 'B':
        return 'border-4 border-red-500'
      default:
        return 'border-4 border-gray-500'
    }
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

const StudentDocument = ({ document, title, corrections }) => {
  const [showPopup, setShowPopup] = useState(false)
  const [severity, setSeverity] = useState('')
  const [popupContent, setPopupContent] = useState('')
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })

  const handleMouseOver = (event) => {
    const target = event.target
    if (target.tagName === 'SPAN' && target.dataset.text) {
      const id = target.dataset.id
      const description =
        target.dataset.description || 'Descrição não disponível'
      // Você pode usar o ID para fazer uma consulta posterior
      const position = { x: event.clientX, y: event.clientY }
      const correction = target.dataset.correction
      console.log(correction)
      setPopupContent(
        <div>
          <p>
            <strong>Descrição:</strong> {target.dataset.description}
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
      setSeverity(target.dataset.severity)
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

  const correctionsData = corrections.map((correction) => ({
    text: correction.text,
    id: correction.id,
    severity: correction.severity,
    description: correction.description,
    correct: correction.correct,
  }))

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
          `${markStart}<span data-id="${correction.id}" data-text="${correction.text}" data-correction="${correction.correct}" data-description="${correction.description}">${match}</span>${markEnd}`
      )
    })
    return content
  }

  const highlightedContent = highlightCorrections(
    document.content,
    correctionsData
  )

  return (
    <>
      {showPopup && (
        <MousePopup
          content={popupContent}
          position={popupPosition}
          severity={severity}
        />
      )}
      <div>
        <h3 className="mb-2 text-2xl font-semibold text-gray-800">{title}</h3>
        <p className="mb-2 text-sm text-gray-600">
          {formatDate(document.handed)}
        </p>
        <p className="mb-2 text-sm text-gray-600"></p>
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
      {corrections && <h2 className="mb-4 text-xl font-bold">Correção</h2>}
      {corrections.map((correction) => (
        <div key={correction.id}>
          <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
            <p>
              <span className="font-bold">Description:</span>{' '}
              {correction.description}
            </p>
            <p>
              <span className="font-bold">Text:</span> {correction.text}
            </p>
            <p>
              <span className="font-bold">Correct:</span> {correction.correct}
            </p>
            <p>
              <span className="font-bold">Severity:</span> {correction.severity}
            </p>
          </div>
        </div>
      ))}
    </>
  )
}

export default StudentDocument
