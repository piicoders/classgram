import { useEffect, useState } from 'react'

import { Tooltip } from 'react-tooltip'

import { useAuth } from 'src/auth'

import ActivityReview from '../ActivityReview/ActivityReview'
import CorrectionModal from '../CorrectionModal/CorrectionModal' // Importe o CorrectionModal
import { geminiRun } from '../GeminiCorrection/GeminiCorrection'

const DocumentText = ({
  title,
  content,
  handed,
  corrections,
  documentId,
  theme,
  promptId,
}) => {
  const { currentUser } = useAuth()
  const [showModal, setShowModal] = useState(false) // Modal de Avaliar
  const [showCorrectionModal, setShowCorrectionModal] = useState(false) // Modal de Correção
  const [geminiResponse, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [correctionData, setCorrectionData] = useState({
    text: '',
    description: '',
    correction: '',
  })

  const handleModalOpen = (text, description, correction) => {
    setCorrectionData({ text, description, correction })
    setShowCorrectionModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  const handleCorrectionModalClose = () => {
    setShowCorrectionModal(false)
    setCorrectionData({ text: '', description: '', correction: '' }) // Limpa os dados ao fechar
  }

  const handleAccept = (event) => {
    const span = event.currentTarget // Captura o span que foi clicado
    const id = span.dataset.id // Obtém o id
    const tooltipHtml = span.dataset.tooltipHtml // Obtém o conteúdo do tooltip

    // Extrai a descrição e a correção do conteúdo do tooltip
    const [description, correction] = tooltipHtml
      .split('<br />')
      .map((item) => item.replace(/^Descrição: /, '').trim())

    const text = span.innerText // Obtém o texto dentro do span
    console.log('ID:', id)
    console.log('Descrição:', description)
    console.log('Correção:', correction)
    console.log('Texto:', text)

    handleModalOpen(text, description, correction) // Abre o modal com as informações extraídas
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
        case 'IA':
          color = 'rgba(128, 128, 128, 1.0)'
          break
        default:
          color = 'inherit'
      }

      const markStart = `<mark style="background-color: ${color}">`
      const markEnd = '</mark>'
      const regex = new RegExp(correction.text, 'gi')
      const text = `${
        correction.description ? `Descrição: ${correction.description}` : ''
      }<br />${correction.correct ? `Correção: ${correction.correct}` : ''}`

      // Conditionally add onClick only for severity 'IA'
      const clickHandler =
        correction.severity === 'IA' ? 'onclick="handleAccept(event)"' : ''

      content = content.replace(
        regex,
        (match) =>
          `${markStart}<span data-id="${correction.id}" class="${correction.severity}" data-tooltip-id="tooltip-${correction.severity}" data-tooltip-html="${text}" ${clickHandler}>${match}</span>${markEnd}`
      )
    })
    return content
  }

  const correctionsData = [
    ...corrections.map((correction) => ({
      text: correction.text,
      id: correction.id,
      severity: correction.severity,
      description: correction.description,
      correct: correction.correct,
    })),
    ...(geminiResponse?.corrections || []).map((correction) => ({
      text: correction.text,
      id: correction.id,
      severity: 'IA',
      description: correction.description,
      correct: correction.correct,
    })),
  ]

  const highlightedContent = highlightCorrections(
    content.replace(/\n/g, '<br>'),
    correctionsData
  )

  useEffect(() => {
    const spans = document.querySelectorAll('span[class="IA"]')

    spans.forEach((span) => {
      span.addEventListener('click', handleAccept)
    })

    // Cleanup event listeners on component unmount
    return () => {
      spans.forEach((span) => {
        span.removeEventListener('click', handleAccept)
      })
    }
  }, [highlightedContent])

  return (
    <div>
      <Tooltip id="tooltip-B" style={{ backgroundColor: '#8C1E1E' }} />
      <Tooltip id="tooltip-G" style={{ backgroundColor: '#18712B' }} />
      <Tooltip
        id="tooltip-N"
        style={{ backgroundColor: '#FFDD57', color: '#222' }}
      />
      <Tooltip
        id="tooltip-IA"
        clickable
        style={{ backgroundColor: '#808080', color: 'white' }}
      />

      {showModal && (
        <ActivityReview documentId={documentId} onClose={handleModalClose} />
      )}
      {showCorrectionModal && (
        <CorrectionModal
          documentId={documentId}
          selection={{ text: correctionData.text }}
          onClose={handleCorrectionModalClose}
          correctionAi={correctionData.correction}
          descriptionAi={correctionData.description}
          promptId={promptId}
        />
      )}
      <div id="documentContent" className="mb-16">
        <h3 className="mb-2 flex items-center justify-between text-2xl font-semibold text-gray-800">
          {title}
          {currentUser.roles === 'P' && (
            <div>
              <button
                onClick={() =>
                  geminiRun(
                    content,
                    theme,
                    setLoading,
                    setResponse,
                    currentUser
                  )
                }
                className="focus:shadow-outline rounded bg-blue-800 px-4 py-2 font-bold text-white hover:bg-blue-500 focus:outline-none"
              >
                Correção IA
              </button>

              <button
                onClick={() => setShowModal(true)} // Abre o modal de avaliação
                className="focus:shadow-outline rounded bg-blue-800 px-4 py-2 font-bold text-white hover:bg-blue-500 focus:outline-none"
              >
                Avaliar
              </button>
            </div>
          )}
        </h3>
        <p className="mb-2 text-sm text-gray-600">
          {formatDate(handed ? handed : new Date())}
        </p>
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
