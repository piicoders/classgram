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
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Registre-se!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form onSubmit={onSubmit} className="space-y-6">
            <div>
              <Label
                name="email"
                className="block text-sm font-medium leading-6 text-gray-900"
                errorClassName="block text-sm font-medium leading-6 text-red-500"
              >
                Email
              </Label>
              <div className="mt-2">
                <TextField
                  name="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ref={usernameRef}
                  autoComplete="email"
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
              </div>
            </div>

            <div>
              <Label
                name="name"
                className="block text-sm font-medium leading-6 text-gray-900"
                errorClassName="block text-sm font-medium leading-6 text-red-500"
              >
                Nome
              </Label>
              <div className="mt-2">
                <TextField
                  name="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ref={usernameRef}
                  autoComplete="name"
                  validation={{
                    required: {
                      value: true,
                      message: 'Informe o nome',
                    },
                  }}
                />
                <FieldError name="name" className="rw-field-error" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label
                  name="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                  errorClassName="block text-sm font-medium leading-6 text-red-500"
                >
                  Senha
                </Label>
              </div>
              <div className="mt-2">
                <PasswordField
                  name="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  autoComplete="current-password"
                  validation={{
                    required: {
                      value: true,
                      message: 'Informe a senha',
                    },
                  }}
                />

                <FieldError name="password" className="rw-field-error" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label
                  name="type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                  errorClassName="block text-sm font-medium leading-6 text-red-500"
                >
                  Tipo
                </Label>
              </div>
              <div className="mt-2">
                <SelectField
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
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
                  <option value={'S'}>Aluno</option>
                  <option value={'P'}>Professor</option>
                </SelectField>
              </div>
            </div>

            <div>
              <Submit className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Registrar
              </Submit>
            </div>
          </Form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Já possui conta?{' '}
            <Link
              to={routes.login()}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Faça Login!
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignupPage
