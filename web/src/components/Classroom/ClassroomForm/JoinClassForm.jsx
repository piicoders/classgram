import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const CREATE_USER_MUTATION = gql`
  mutation addStudentClass($classCode: String!, $studentId: String!) {
    addStudentClass(classCode: $classCode, studentId: $studentId) {
      name
      code
    }
  }
`

const JoinClassForm = (props) => {
  const [createUser, { loading, error }] = useMutation(
    CREATE_USER_MUTATION,

    {
      onCompleted: () => {
        toast.success('Bem vindo à turma')
        navigate(routes.classrooms())
      },

      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const handleSubmit = (data) => {
    createUser({
      variables: { classCode: data.classCode, studentId: props.studentID },
    })
    console.log('Código da turma:', data.code)
  }

  return (
    <Form
      onSubmit={handleSubmit}
      error={error}
      loading={loading}
      className="mx-auto mt-4 max-w-sm"
    >
      <FormError
        error={error}
        wrapperClassName="rw-form-error-wrapper"
        titleClassName="rw-form-error-title"
        listClassName="rw-form-error-list"
      />
      <div className="mb-4">
        <Label name="code" className="block text-sm font-medium text-gray-700">
          Código da Turma:
        </Label>

        <TextField
          name="classCode"
          id="classCode"
          placeholder="Digite o código da turma"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="classCode" className="rw-field-error" />
      </div>
      <Submit
        disabled={loading}
        className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
      >
        Associar-se à Turma
      </Submit>
    </Form>
  )
}

export default JoinClassForm
