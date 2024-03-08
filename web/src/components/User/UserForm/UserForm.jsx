import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  RadioField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const UserForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.user?.id)
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
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
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
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.user?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="hashedPassword"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Hashed password
        </Label>

        <TextField
          name="hashedPassword"
          defaultValue={props.user?.hashedPassword}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="hashedPassword" className="rw-field-error" />

        <Label
          name="salt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Salt
        </Label>

        <TextField
          name="salt"
          defaultValue={props.user?.salt}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="salt" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="user-type-0"
            name="type"
            defaultValue="P"
            defaultChecked={props.user?.type?.includes('P')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />

          <div>P</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="user-type-1"
            name="type"
            defaultValue="S"
            defaultChecked={props.user?.type?.includes('S')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />

          <div>S</div>
        </div>

        <FieldError name="type" className="rw-field-error" />

        <Label
          name="resetToken"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Reset token
        </Label>

        <TextField
          name="resetToken"
          defaultValue={props.user?.resetToken}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="resetToken" className="rw-field-error" />

        <Label
          name="resetTokenExpiredAt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Reset token expired at
        </Label>

        <DatetimeLocalField
          name="resetTokenExpiredAt"
          defaultValue={formatDatetime(props.user?.resetTokenExpiredAt)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="resetTokenExpiredAt" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UserForm
