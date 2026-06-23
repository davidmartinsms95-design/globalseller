'use client'

import { useState } from 'react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')

  const [loading, setLoading] =
    useState(false)

  const [success, setSuccess] =
    useState(false)

  async function handleForgotPassword(
    e: React.FormEvent
  ) {
    e.preventDefault()

    try {
      setLoading(true)

      const response = await fetch(
        '/api/forgot-password',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            email,
          }),
        }
      )

      if (response.ok) {
        setSuccess(true)
      }

      setLoading(false)
    } catch (error) {
      console.log(error)

      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090b] px-6 text-white">
      <div className="w-full max-w-xl rounded-[32px] border border-zinc-800 bg-zinc-900 p-10">
        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Recuperar senha
          </h1>

          <p className="mt-4 text-zinc-400">
            Enviaremos um link para redefinir
            sua senha.
          </p>
        </div>

        {success ? (
          <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-6">
            <h2 className="text-2xl font-bold text-green-400">
              Email enviado 🚀
            </h2>

            <p className="mt-3 text-zinc-300">
              Verifique sua caixa de entrada
              para redefinir sua senha.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleForgotPassword}
            className="space-y-6"
          >
            <div>
              <label className="mb-3 block font-bold">
                Seu email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full rounded-2xl border border-zinc-700 bg-black p-5"
                placeholder="Digite seu email"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-orange-500 px-6 py-5 text-xl font-bold text-white transition hover:bg-orange-400"
            >
              {loading
                ? 'Enviando...'
                : 'Enviar link'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

