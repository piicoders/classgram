import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const CorrectionForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.correction?.id)
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
          name="from"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          From
        </Label>

        <NumberField
          name="from"
          defaultValue={props.correction?.from}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="from" className="rw-field-error" />

        <Label
          name="to"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          To
        </Label>

        <NumberField
          name="to"
          defaultValue={props.correction?.to}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="to" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.correction?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="professorId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Professor id
        </Label>

        <TextField
          name="professorId"
          defaultValue={props.correction?.professorId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="professorId" className="rw-field-error" />

        <Label
          name="subfactorId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Subfactor id
        </Label>

        <NumberField
          name="subfactorId"
          defaultValue={props.correction?.subfactorId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="subfactorId" className="rw-field-error" />

        <Label
          name="documentId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Document id
        </Label>

        <NumberField
          name="documentId"
          defaultValue={props.correction?.documentId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="documentId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default CorrectionForm
