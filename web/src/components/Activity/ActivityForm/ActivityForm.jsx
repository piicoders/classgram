import React, { useEffect, useState } from 'react'

import { gql } from 'graphql-tag'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { SelectField } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import { useQuery } from '@redwoodjs/web'

const PROMPTS_QUERY = gql`
  query Prompts {
    prompts {
      id
      description
    }
  }
`

const ActivityForm = (props) => {
  const [prompts, setPrompts] = useState(null)
  const [dueDate, setDueDate] = useState(new Date())
  const [selectedPromptId, setSelectedPromptId] = useState('')

  const { loading, error, data } = useQuery(PROMPTS_QUERY)

  useEffect(() => {
    if (!loading && !error && data && data.prompts) {
      setPrompts(data.prompts)
    } else if (error) {
      console.error('Erro:', error)
    }
  }, [loading, error, data])

  useEffect(() => {
    if (props.activity?.dueDate) {
      setDueDate(new Date(props.activity.dueDate))
    }
    if (props.activity?.promptId) {
      setSelectedPromptId(props.activity.promptId)
    }
  }, [props.activity])

  const onSubmit = (data) => {
    data.classroomId = props.classId
    data.promptId = parseInt(selectedPromptId)
    data.dueDate = dueDate.toISOString()
    props.onSave(data, props?.activity?.id)
  }

  return (
    <div className="mx-auto max-w-lg rounded bg-white p-8 shadow-md">
      <Form onSubmit={onSubmit} error={props.error} className="space-y-6">
        <FormError
          error={props.error}
          wrapperClassName="text-red-600 mb-4"
          titleClassName="font-bold"
          listClassName="list-disc list-inside"
        />

        <div className="space-y-1">
          <Label
            name="name"
            className="block text-lg font-medium text-gray-700"
            errorClassName="text-red-600"
          >
            Nome
          </Label>
          <TextField
            name="name"
            defaultValue={props.activity?.name}
            className="block w-full rounded border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
            errorClassName="block w-full rounded border border-red-600 px-4 py-2 focus:outline-none focus:border-red-600"
            validation={{ required: true }}
          />
          <FieldError name="name" className="mt-1 text-red-600" />
        </div>

        <div className="space-y-1">
          <Label
            name="description"
            className="block text-lg font-medium text-gray-700"
            errorClassName="text-red-600"
          >
            Descrição
          </Label>
          <TextField
            name="description"
            defaultValue={props.activity?.description}
            className="block w-full rounded border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
            errorClassName="block w-full rounded border border-red-600 px-4 py-2 focus:outline-none focus:border-red-600"
            validation={{ required: true }}
          />
          <FieldError name="description" className="mt-1 text-red-600" />
        </div>

        <div className="space-y-1">
          <Label
            name="dueDate"
            className="block text-lg font-medium text-gray-700"
            errorClassName="text-red-600"
          >
            Data de entrega
          </Label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            showTimeSelect
            dateFormat="Pp"
            className="block w-full rounded border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
            errorClassName="block w-full rounded border border-red-600 px-4 py-2 focus:outline-none focus:border-red-600"
          />
          <FieldError name="dueDate" className="mt-1 text-red-600" />
        </div>

        <div className="space-y-1">
          <Label
            name="maxSize"
            className="block text-lg font-medium text-gray-700"
            errorClassName="text-red-600"
          >
            Limite de caracteres
          </Label>
          <NumberField
            name="maxSize"
            defaultValue={props.activity?.maxSize}
            className="block w-full rounded border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
            errorClassName="block w-full rounded border border-red-600 px-4 py-2 focus:outline-none focus:border-red-600"
            validation={{ required: true }}
            min={1}
          />
          <FieldError name="maxSize" className="mt-1 text-red-600" />
        </div>

        <div className="space-y-1">
          <Label
            name="promptId"
            className="block text-lg font-medium text-gray-700"
            errorClassName="text-red-600"
          >
            Tipo de Atividade
          </Label>
          <SelectField
            name="promptId"
            value={selectedPromptId}
            onChange={(e) => setSelectedPromptId(e.target.value)}
            className="block w-full rounded border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
            errorClassName="block w-full rounded border border-red-600 px-4 py-2 focus:outline-none focus:border-red-600"
            validation={{ required: true }}
          >
            <option value="">Selecione uma opção</option>
            {prompts &&
              prompts.map((prompt) => (
                <option key={prompt.id} value={prompt.id}>
                  {prompt.description}
                </option>
              ))}
          </SelectField>
          <FieldError name="promptId" className="mt-1 text-red-600" />
        </div>

        <div className="mt-6 flex justify-center">
          <Submit
            disabled={props.loading}
            className="rounded bg-blue-800 px-6 py-2 text-white hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
          >
            {props.loading ? 'Criando...' : 'Criar'}
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ActivityForm
