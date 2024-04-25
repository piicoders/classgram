import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const ClassroomForm = (props) => {
  const onSubmit = (data) => {
    const { classroom } = props
    const professorId = props.professorID
    props.onSave({ ...data, professorId, code }, classroom?.id)
  }

  const gerarCodigoAleatorio = () => {
    let codigo = ''
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 5; i++) {
      codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
    }
    return codigo
  }

  const code = props.classroom?.code || gerarCodigoAleatorio()

  return (
    <div className="container mx-auto px-4 py-8">
      <Form
        onSubmit={onSubmit}
        className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md"
      >
        <FormError
          error={props.error}
          wrapperClassName="text-red-500"
          titleClassName="font-bold"
          listClassName="list-disc pl-5"
        />

        <div className="mb-6">
          <Label
            htmlFor="code"
            className="block flex justify-center text-lg font-medium text-gray-700"
          >
            Código da Turma
          </Label>
          <div
            id="code"
            className="mt-1 flex justify-center text-lg font-medium text-gray-900"
          >
            {code}
          </div>
        </div>

        <div className="mb-6">
          <Label
            htmlFor="name"
            className="block text-lg font-medium text-gray-700"
          >
            Nome
          </Label>
          <TextField
            name="name"
            defaultValue={props.classroom?.name}
            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            errorClassName="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm text-gray-700"
            validation={{ required: true }}
          />
          <FieldError name="name" className="mt-2 text-sm text-red-500" />
        </div>

        <div className="flex justify-center">
          <Submit
            disabled={props.loading}
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {props.loading ? 'Criando...' : 'Criar'}
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ClassroomForm
