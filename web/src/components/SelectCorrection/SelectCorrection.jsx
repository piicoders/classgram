import React, { useEffect, useState, useRef } from 'react'

import { Form } from '@redwoodjs/forms'
import { useQuery, gql } from '@redwoodjs/web'

import CorrectionModal from '../CorrectionModal'

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
  const [selectedSubfactor, setSelectedSubfactor] = useState(null)

  const modalRef = useRef(null)

  const { loading, error, data } = useQuery(CRITERIA_BY_PROMPT_ID, {
    variables: { promptId: promptId },
  })

  useEffect(() => {
    if (!loading && !error && data && data.criteriaByPromptId) {
      setCriteria(data.criteriaByPromptId)
    } else {
      console.error('Erro:', error)
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

  function onShare(text) {
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
        <CorrectionModal
          selection={selection}
          criteria={criteria}
          onClose={closePopup}
          onSubmit={handleSubmit}
          onSelectCriterion={(event) =>
            setSelectedCriterion(event.target.value)
          }
          selectedCriterion={selectedCriterion}
          onSelectSubfactor={(event) =>
            setSelectedSubfactor(event.target.value)
          }
          selectedSubfactor={selectedSubfactor}
        />
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
            onClick={() => onShare(selection.text)}
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
