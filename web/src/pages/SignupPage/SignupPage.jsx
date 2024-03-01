import { useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
  SelectField,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on username box on page load
  const usernameRef = useRef(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await signUp({
      username: data.email,
      password: data.password,
      type: data.type,
      name: data.name,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Bem Vindo!')
    }
  }

  return (
    <>
      <Metadata title="Signup" />

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold login-container">
          <div className="rw-segment">
            <h2 className="login-heading login-heading-secondary">
              Registre-se!
            </h2>

            <div className="login-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <Label
                    name="email"
                    className="login-label"
                    errorClassName="login-label rw-label-error"
                  >
                    Email
                  </Label>
                  <TextField
                    name="email"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    ref={usernameRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Informe o email',
                      },
                      pattern: {
                        value: /^[^@]+@[^.]+\..+$/,
                        message: 'Informe um email válido',
                      },
                    }}
                  />

                  <FieldError name="email" className="rw-field-error" />

                  <Label
                    name="name"
                    className="login-label"
                    errorClassName="login-label rw-label-error"
                  >
                    Nome
                  </Label>
                  <TextField
                    name="name"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    ref={usernameRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Informe o nome',
                      },
                    }}
                  />

                  <FieldError name="name" className="rw-field-error" />

                  <Label
                    name="password"
                    className="login-label"
                    errorClassName="login-label rw-label-error"
                  >
                    Senha
                  </Label>
                  <PasswordField
                    name="password"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Informe a senha',
                      },
                    }}
                  />

                  <FieldError name="password" className="rw-field-error" />
                  <SelectField
                    className="selectType"
                    name="type"
                    validation={{
                      required: true,
                      validate: {
                        matchesInitialValue: (value) => {
                          return (
                            value !== 'Por favor selecione uma opção' ||
                            'Selecione uma opção'
                          )
                        },
                      },
                    }}
                  >
                    <option value={'STUDENT'}>Aluno</option>
                    <option value={'PROFESSOR'}>Professor</option>
                  </SelectField>
                  <FieldError name="type" style={{ color: 'red' }} />
                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue login-button">
                      Sign Up
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span>Ja possui conta?</span>{' '}
            <Link to={routes.login()} className="rw-link">
              Log in!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default SignupPage
