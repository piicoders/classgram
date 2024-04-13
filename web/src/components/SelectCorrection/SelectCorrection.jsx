import { useEffect, useState, useRef } from 'react'

import { XIcon } from '@heroicons/react/outline'

import { SelectField, Form } from '@redwoodjs/forms'
import { useQuery, gql } from '@redwoodjs/web'

const CRITERIA_BY_PROMPT_ID = gql`
  query CriteriaByPromptId($promptId: Int!) {
    criteriaByPromptId(promptId: $promptId) {
      id
      name
    }
  }
`

const SelectCorrection = ({ promptId }) => {
  const [selection, setSelection] = useState(null)
  const [position, setPosition] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [criteria, setCriteria] = useState(null)
  const [selectedCriterion, setSelectedCriterion] = useState(null)
  const modalRef = useRef(null)

  const { loading, error, data } = useQuery(CRITERIA_BY_PROMPT_ID, {
    variables: { promptId: promptId },
  })

  useEffect(() => {
    if (!loading && !error && data && data.criteriaByPromptId) {
      console.log('Critérios recuperados:', data.criteriaByPromptId)
      setCriteria(data.criteriaByPromptId)
    } else {
      console.log('Erro ao recuperar critérios:', error)
    }
  }, [loading, error, data])

  function onSelectStart() {
    setSelection(undefined)
  }

  function onSelectEnd() {
    const activeSelection = document.getSelection()
    const text = activeSelection?.toString()

    if (!activeSelection || !text) {
      setSelection(undefined)
      return
    }

    setSelection({
      text: text,
      promptId: promptId,
    })

    const rect = activeSelection.getRangeAt(0).getBoundingClientRect()

    setPosition({
      x: rect.left + rect.width / 2 - 80 / 2,
      y: rect.top + window.scrollY - 30,
      width: rect.width,
      height: rect.height,
    })
  }

  useEffect(() => {
    const documentContent = document.getElementById('documentContent')
    documentContent.addEventListener('selectstart', onSelectStart)
    documentContent.addEventListener('mouseup', onSelectEnd)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      documentContent.removeEventListener('selectstart', onSelectStart)
      documentContent.removeEventListener('mouseup', onSelectEnd)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  function handleClickOutside(event) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false)
    }
  }

  function onShare(promptId, text) {
    const textToShare = text || selection
    if (!textToShare) return
    const message = textToShare
    console.log(message, position)
    setShowModal(true)
  }

  function closePopup() {
    setShowModal(false)
  }

  function handleSubmit() {}

  return (
    <Form onSubmit={handleSubmit}>
      {selection && position && showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div
            ref={modalRef}
            className="relative max-h-[80vh] w-96 overflow-y-auto rounded-lg bg-white p-6 shadow-lg"
          >
            <button
              className="absolute right-2 top-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={closePopup}
            >
              <XIcon className="h-6 w-6" />
            </button>
            <h2 className="mb-4 text-lg font-semibold">Comentário</h2>
            <div className="mb-2">
              <h3 className="mb-2 text-lg font-semibold">Parte selecionada:</h3>
              <span className="font-normal text-gray-800">
                {selection.text.split('').map((char, index) => (
                  <span key={index} className="highlighted-text">
                    {char}
                  </span>
                ))}
              </span>
            </div>
            <div className="mb-2">
              <h3 className="mb-2 text-lg font-semibold">
                Tipo do comentário:
              </h3>
              <SelectField
                className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                name="severity"
                validation={{
                  required: true,
                  validate: {
                    matchesInitialValue: (value) => {
                      return (
                        value !== 'Por favor selecione uma opção' ||
                        'Selecione uma opção'
                      )
                    },
                  },
                }}
              >
                <option value={'G'}>Bom</option>
                <option value={'N'}>Neutro</option>
                <option value={'B'}>Ruim</option>
              </SelectField>
            </div>
            <div className="mb-4">
              <h3 className="mb-2 text-lg font-semibold">Descrição:</h3>
              <textarea
                name="description"
                className="h-16 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                placeholder="Digite a descrição aqui..."
              ></textarea>
            </div>
            <div className="mb-4">
              <h3 className="mb-2 text-lg font-semibold">Correção:</h3>
              <textarea
                name="correction"
                className="h-16 w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                placeholder="Digite a correção aqui..."
              ></textarea>
            </div>
            <div className="mb-4">
              <h3 className="mb-2 text-lg font-semibold">Critério:</h3>
              <SelectField
                className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                name="criterion"
                value={selectedCriterion}
                onChange={(event) => setSelectedCriterion(event.target.value)}
              >
                <option value="">Selecione um critério</option>
                {criteria &&
                  criteria.map((criterion) => (
                    <option key={criterion.id} value={criterion.id}>
                      {criterion.name}
                    </option>
                  ))}
              </SelectField>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
      {selection && position && (
        <p
          className="
            absolute -top-2 left-0 m-0 h-[30px] rounded bg-black text-white
            after:absolute after:left-1/2 after:top-full after:h-0 after:w-0 after:-translate-x-2 after:rotate-180 after:border-x-[6px] after:border-b-[8px] after:border-x-transparent after:border-b-black
          "
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          }}
        >
          <button
            className="flex h-full w-full items-center justify-between px-2"
            onClick={() => onShare(promptId, selection.text)}
          >
            <span id="share" className="text-xs">
              + Comentário
            </span>
          </button>
        </p>
      )}
    </Form>
  )
}

export default SelectCorrection
