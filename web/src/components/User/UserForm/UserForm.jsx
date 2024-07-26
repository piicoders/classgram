import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const UserForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.user?.id)
  }

  return (
    <div className="">
      {/* NEW */}

      <div className="mx-auto flex h-[350px] max-w-sm flex-col justify-between overflow-hidden rounded-lg border bg-white shadow-md">
        <div className="h-24 bg-blue-900"></div>

        <Form onSubmit={onSubmit} error={props.error} className="mx-4">
          <FormError
            error={props.error}
            wrapperClassName="rw-form-error-wrapper"
            titleClassName="rw-form-error-title"
            listClassName="rw-form-error-list"
          />

          <Label
            name="email"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            E-mail
          </Label>

          <TextField
            name="email"
            defaultValue={props.user?.email}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />

          <FieldError name="email" className="rw-field-error" />

          <Label
            name="name"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Nome
          </Label>

          <TextField
            name="name"
            defaultValue={props.user?.name}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />

          <div className="mb-4 text-center">
            <hr className="my-6" />
          </div>

          <FieldError name="name" className="rw-field-error" />

          <div className="rw-button-group">
            <Submit
              disabled={props.loading}
              className="rounded-lg bg-blue-900 px-4 py-2 text-white"
            >
              {props.loading ? 'Salvando...' : 'Salvar Alterações'}
            </Submit>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default UserForm
