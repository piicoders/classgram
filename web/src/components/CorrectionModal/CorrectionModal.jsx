import React, { useEffect, useState, useRef } from 'react'

import { XIcon } from '@heroicons/react/outline'

import { Form, SelectField, FieldError, useForm } from '@redwoodjs/forms'
import { useQuery, gql, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const CRITERIA_QUERY = gql`
  query Criteria {
    criteria {
      id
      name
    }
  }
`

const SUBFACTORS_BY_CRITERION_ID = gql`
  query SubfactorsByCriterionId($criterionId: Int!) {
    subfactorsByCriterionId(criterionId: $criterionId) {
      id
      name
      description
    }
  }
`

const CREATE_CORRECTION_MUTATION = gql`
  mutation CreateCorrectionMutation($input: CreateCorrectionInput!) {
    createCorrection(input: $input) {
      id
    }
  }
`

const CorrectionModal = ({
  documentId,
  selection,
  onClose,
  descriptionAi,
  correctionAi,
  onCorrectionSubmission,
}) => {
  const { currentUser } = useAuth()
  const formMethods = useForm()

  const [description, setDescription] = useState(
    descriptionAi ? descriptionAi : ''
  )
  const [correction, setCorrection] = useState(correctionAi ? correctionAi : '')
  const [selectedCriterion, setSelectedCriterion] = useState('')
  const [selectedSubfactor, setSelectedSubfactor] = useState('')
  const [subfactors, setSubfactors] = useState([])
  const [subfactorDescription, setSubfactorDescription] = useState('')
  const [severity, setSeverity] = useState('')

  const descriptionTextAreaRef = useRef(null)
  const correctionTextAreaRef = useRef(null)
  const modalRef = useRef(null)

  // Fetch criteria
  const {
    loading: criteriaLoading,
    error: criteriaError,
    data: criteriaData,
  } = useQuery(CRITERIA_QUERY)

  // Fetch subfactors based on selected criterion
  const {
    loading: subfactorsLoading,
    error: subfactorsError,
    data: subfactorsData,
  } = useQuery(SUBFACTORS_BY_CRITERION_ID, {
    variables: { criterionId: parseInt(selectedCriterion) },
    skip: !selectedCriterion,
  })

  useEffect(() => {
    if (subfactorsData && subfactorsData.subfactorsByCriterionId) {
      setSubfactors(subfactorsData.subfactorsByCriterionId)
    }
  }, [subfactorsData])

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

  const [createCorrection, { createLoading, _createError }] = useMutation(
    CREATE_CORRECTION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Correção criada.')
        onCorrectionSubmission()
        onClose()
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    const input = {
      text: selection.text,
      description: subfactorDescription,
      correct: correction,
      severity: data.severity,
      professorId: currentUser.id,
      subfactorId: parseInt(selectedSubfactor),
      documentId: documentId,
    }
    createCorrection({ variables: { input } })
  }

  const onSelectCriterion = (e) => {
    setSelectedCriterion(e.target.value)
    setSelectedSubfactor('')
  }

  const onSelectSubfactor = (e) => {
    setSelectedSubfactor(e.target.value)
  }

  const handleSeverityChange = (e) => {
    setSeverity(e.target.value)
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <Form formMethods={formMethods} onSubmit={onSubmit}>
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
            <h3 className="mb-2 text-lg font-semibold">Tipo do comentário:</h3>
            <SelectField
              name="severity"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
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
              onChange={handleSeverityChange}
            >
              <option value={'G'}>Bom</option>
              <option value={'N'}>Neutro</option>
              <option value={'B'}>Ruim</option>
            </SelectField>
            <FieldError name="severity" className="rw-field-error" />
          </div>
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold">Critério:</h3>
            <SelectField
              className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
              name="criterion"
              value={selectedCriterion || ''}
              onChange={onSelectCriterion}
              validation={{
                required: { value: true, message: 'Critério é obrigatório' },
              }}
            >
              <option value="">Selecione um critério</option>
              {!criteriaLoading &&
                criteriaData &&
                criteriaData.criteria.map((criterion) => (
                  <option key={criterion.id} value={criterion.id}>
                    {criterion.name}
                  </option>
                ))}
            </SelectField>
            <FieldError name="criterion" className="rw-field-error" />
          </div>
          <div className="mb-4">
            <h3 className="mb-2 text-lg font-semibold">Subfatores:</h3>
            <SelectField
              className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
              name="subfactor"
              value={selectedCriterion ? selectedSubfactor || '' : ''}
              onChange={onSelectSubfactor}
              disabled={!selectedCriterion}
              validation={{
                required: { value: true, message: 'Subfator é obrigatório' },
              }}
            >
              {!selectedCriterion && (
                <option value="" disabled>
                  Selecione um critério primeiro
                </option>
              )}
              {selectedCriterion && (
                <option value="">Selecione um subfator</option>
              )}
              {subfactors &&
                subfactors.map((subfactor) => (
                  <option key={subfactor.id} value={subfactor.id}>
                    {subfactor.name}
                  </option>
                ))}
            </SelectField>
            <FieldError name="subfactor" className="rw-field-error" />
          </div>

          {/* Show description and correction fields only if both selectors are filled */}
          {selectedCriterion && selectedSubfactor && (
            <>
              <div className="mb-4">
                <h3 className="mb-2 text-lg font-semibold">Descrição:</h3>
                <textarea
                  ref={descriptionTextAreaRef}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                  rows={1}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva seu comentário"
                />
              </div>
              {severity === 'B' && ( // Show correction area only if severity is 'B'
                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-semibold">Correção:</h3>
                  <textarea
                    ref={correctionTextAreaRef}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                    rows={3}
                    value={correction}
                    onChange={(e) => setCorrection(e.target.value)}
                    placeholder="Insira sua correção"
                  />
                </div>
              )}
            </>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={createLoading}
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {createLoading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default CorrectionModal
