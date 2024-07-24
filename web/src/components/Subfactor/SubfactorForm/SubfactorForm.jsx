import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const SubfactorForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.subfactor?.id)
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
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.subfactor?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="criterionId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Criterion id
        </Label>

        <NumberField
          name="criterionId"
          defaultValue={props.subfactor?.criterionId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="criterionId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            {props.loading ? 'Salvando...' : 'Salvar'}
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default SubfactorForm
