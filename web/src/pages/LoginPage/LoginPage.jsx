import { useRef, useState } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()
  const [loading, setLoading] = useState(false) // Estado para controlar o carregamento do login

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.classrooms())
    }
  }, [isAuthenticated])

  const emailRef = useRef(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    setLoading(true) // Inicia o estado de carregamento

    const response = await logIn({
      username: data.email,
      password: data.password,
    })

    setLoading(false) // Finaliza o estado de carregamento após a resposta

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Bem vindo de volta!')
    }
  }

  return (
    <>
      <Metadata title="Login" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="/icon.png"
            alt="Classgram"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Bem Vindo!
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
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                  ref={emailRef}
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
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
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
              <Submit
                className={`flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 ${
                  loading ? 'cursor-not-allowed opacity-50' : ''
                }`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Carregando...
                  </>
                ) : (
                  'Login'
                )}
              </Submit>
            </div>
          </Form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Não possui conta?{' '}
            <Link
              to={routes.signup()}
              className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500"
            >
              Registre-se!
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginPage
