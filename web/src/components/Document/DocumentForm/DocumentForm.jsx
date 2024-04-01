import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const DocumentForm = (props) => {
  const onSubmit = (data) => {
    data['handed'] = new Date()
    props.onSave(data, props?.document?.id)
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
          name="content"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Content
        </Label>

        <TextField
          name="content"
          defaultValue={props.document?.content}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="content" className="rw-field-error" />

        <Label
          name="activityId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Activity id
        </Label>

        <NumberField
          name="activityId"
          defaultValue={props.document?.activityId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="activityId" className="rw-field-error" />

        <Label
          name="studentId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Student id
        </Label>

        <TextField
          name="studentId"
          defaultValue={props.document?.studentId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="studentId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default DocumentForm
