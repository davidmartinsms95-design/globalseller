'use client'

import { useState } from 'react'

export default function ResetPasswordPage() {
  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [success, setSuccess] =
    useState(false)

  async function handleResetPassword(
    e: React.FormEvent
  ) {
    e.preventDefault()

    try {
      setLoading(true)

      /*
        Futuramente:
        enviar token + senha
      */

      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      )

      setSuccess(true)

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
            Nova senha
          </h1>

          <p className="mt-4 text-zinc-400">
            Defina uma nova senha para sua
            conta.
          </p>
        </div>

        {success ? (
          <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-6">
            <h2 className="text-2xl font-bold text-green-400">
              Senha alterada 🚀
            </h2>

            <p className="mt-3 text-zinc-300">
              Sua senha foi redefinida com
              sucesso.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleResetPassword}
            className="space-y-6"
          >
            <div>
              <label className="mb-3 block font-bold">
                Nova senha
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full rounded-2xl border border-zinc-700 bg-black p-5"
                placeholder="Digite sua nova senha"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-orange-500 px-6 py-5 text-xl font-bold text-white transition hover:bg-orange-400"
            >
              {loading
                ? 'Alterando...'
                : 'Salvar nova senha'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}