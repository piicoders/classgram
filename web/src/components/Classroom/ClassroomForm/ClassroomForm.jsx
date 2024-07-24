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
    <div className="container mx-auto px-4 py-4">
      <Form
        onSubmit={onSubmit}
        className="p-8d mx-auto max-w-lg rounded-lg bg-[#FOF3FA]"
      >
        <FormError
          error={props.error}
          wrapperClassName="text-[#395886]"
          titleClassName="text-lg font-semibold"
          listClassName="list-disc pl-5"
        />

        <div className="mb-6">
          <Label
            htmlFor="code"
            className="block text-center text-xl font-semibold text-gray-800"
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

        <div className="mb-4">
          <Label
            htmlFor="name"
            className="block text-center text-xl font-semibold text-gray-800"
          >
            Nome
          </Label>
          <TextField
            name="name"
            defaultValue={props.classroom?.name}
            placeholder="Digite o nome da turma"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            errorClassName="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 text-sm text-gray-700"
            validation={{ required: true }}
          />
          <FieldError name="name" className="mt-2 text-sm text-red-500" />
        </div>

        <div className="flex justify-center">
          <Submit
            disabled={props.loading}
            className="inline-flex items-center rounded-md border border-transparent bg-blue-800 hover:bg-blue-500 focus:bg-blue-500 px-6 py-2 text-lg font-semibold text-white"
          >
            {props.loading ? 'Criando...' : 'Criar'}
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ClassroomForm
