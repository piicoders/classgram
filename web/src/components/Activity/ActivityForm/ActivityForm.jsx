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

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const ActivityForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.activity?.id)
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
          defaultValue={props.activity?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.activity?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="dueDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Due date
        </Label>

        <DatetimeLocalField
          name="dueDate"
          defaultValue={formatDatetime(props.activity?.dueDate)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="dueDate" className="rw-field-error" />

        <Label
          name="maxSize"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Max size
        </Label>

        <NumberField
          name="maxSize"
          defaultValue={props.activity?.maxSize}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="maxSize" className="rw-field-error" />

        <Label
          name="promptId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Prompt id
        </Label>

        <NumberField
          name="promptId"
          defaultValue={props.activity?.promptId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="promptId" className="rw-field-error" />

        <Label
          name="classroomId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Classroom id
        </Label>

        <NumberField
          name="classroomId"
          defaultValue={props.activity?.classroomId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="classroomId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ActivityForm
