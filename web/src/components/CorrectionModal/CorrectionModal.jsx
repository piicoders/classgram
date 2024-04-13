import React, { useEffect } from 'react'

import { XIcon } from '@heroicons/react/outline'

import { SelectField } from '@redwoodjs/forms'

const CorrectionModal = ({
  selection,
  criteria,
  onClose,
  onSubmit,
  onSelectCriterion,
  selectedCriterion,
}) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest('.modal-content')) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="modal-content relative max-h-[80vh] w-96 overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
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
          <h3 className="mb-2 text-lg font-semibold">Critério:</h3>
          <SelectField
            className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
            name="criterion"
            value={selectedCriterion}
            onChange={onSelectCriterion}
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
        <div className="flex justify-end">
          <button
            type="submit"
            className="mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
            onClick={onSubmit}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}

export default CorrectionModal
