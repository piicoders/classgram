import React, { useEffect, useState } from 'react'

import { gql } from 'graphql-tag'

import { SelectField } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
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

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const ActivityForm = (props) => {
  const [prompts, setPrompts] = useState(null)

  const { loading, error, data } = useQuery(PROMPTS_QUERY)

  useEffect(() => {
    if (!loading && !error && data && data.prompts) {
      setPrompts(data.prompts)
    } else if (error) {
      console.error('Erro:', error)
    }
  }, [loading, error, data])

  const onSubmit = (data) => {
    data.classroomId = props.classId
    data.promptId = parseInt(data.promptId)
    props.onSave(data, props?.activity?.id)
  }

  return (
    <div className="mx-auto max-w-lg rounded bg-white p-6 shadow">
      <Form onSubmit={onSubmit} error={props.error} className="space-y-4">
        <FormError
          error={props.error}
          wrapperClassName="text-red-500"
          titleClassName="font-bold"
          listClassName="list-disc list-inside"
        />
        <div>
          <Label
            name="name"
            className="mb-1 block font-bold text-gray-700"
            errorClassName="text-red-500"
          >
            Nome
          </Label>
          <TextField
            name="name"
            defaultValue={props.activity?.name}
            className="block w-full rounded border px-4 py-2 focus:border-blue-500 focus:outline-none"
            errorClassName="block w-full px-4 py-2 border border-red-500 rounded focus:outline-none focus:border-red-500"
            validation={{ required: true }}
          />
          <FieldError name="name" className="text-red-500" />
        </div>

        <div>
          <Label
            name="description"
            className="mb-1 block font-bold text-gray-700"
            errorClassName="text-red-500"
          >
            Descrição
          </Label>
          <TextField
            name="description"
            defaultValue={props.activity?.description}
            className="block w-full rounded border px-4 py-2 focus:border-blue-500 focus:outline-none"
            errorClassName="block w-full px-4 py-2 border border-red-500 rounded focus:outline-none focus:border-red-500"
            validation={{ required: true }}
          />
          <FieldError name="description" className="text-red-500" />
        </div>

        <div>
          <Label
            name="dueDate"
            className="mb-1 block font-bold text-gray-700"
            errorClassName="text-red-500"
          >
            Data de entrega
          </Label>
          <DatetimeLocalField
            name="dueDate"
            defaultValue={formatDatetime(props.activity?.dueDate)}
            className="block w-full rounded border px-4 py-2 focus:border-blue-500 focus:outline-none"
            errorClassName="block w-full px-4 py-2 border border-red-500 rounded focus:outline-none focus:border-red-500"
            validation={{ required: true }}
          />
          <FieldError name="dueDate" className="text-red-500" />
        </div>

        <div>
          <Label
            name="maxSize"
            className="mb-1 block font-bold text-gray-700"
            errorClassName="text-red-500"
          >
            Limite de caracteres
          </Label>
          <NumberField
            name="maxSize"
            defaultValue={props.activity?.maxSize}
            className="block w-full rounded border px-4 py-2 focus:border-blue-500 focus:outline-none"
            errorClassName="block w-full px-4 py-2 border border-red-500 rounded focus:outline-none focus:border-red-500"
            validation={{ required: true }}
          />
          <FieldError name="maxSize" className="text-red-500" />
        </div>

        <div>
          <Label
            name="promptId"
            className="mb-1 block font-bold text-gray-700"
            errorClassName="text-red-500"
          >
            Tipo de atividade
          </Label>
          <SelectField
            name="promptId"
            defaultValue={props.activity?.promptId}
            className="block w-full rounded border px-4 py-2 focus:border-blue-500 focus:outline-none"
            errorClassName="block w-full px-4 py-2 border border-red-500 rounded focus:outline-none focus:border-red-500"
            validation={{ required: true }}
          >
            {prompts &&
              prompts.map((prompt) => (
                <option key={prompt.id} value={prompt.id}>
                  {prompt.description}
                </option>
              ))}
          </SelectField>
          <FieldError name="promptId" className="text-red-500" />
        </div>

        <div className="flex justify-center">
          <Submit
            disabled={props.loading}
            className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none"
          >
            Criar
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ActivityForm
