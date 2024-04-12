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
    props.onSave(data, props?.classroom?.id)
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

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.classroom?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="code"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Code
        </Label>

        <TextField
          name="code"
          defaultValue={props.classroom?.code || gerarCodigoAleatorio()}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="code" className="rw-field-error" />

        <Label
          name="professorId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Professor id
        </Label>

        <TextField
          name="professorId"
          defaultValue={props.classroom?.professorId || props.professorID}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="professorId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ClassroomForm
