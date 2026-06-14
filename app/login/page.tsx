'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault()

    alert('Botão clicado')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    console.log(result)

    alert(JSON.stringify(result))

    if (result?.ok) {
      window.location.href = '/dashboard'
    } else {
      alert('Login inválido')
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl"
      >
        <h1 className="mb-8 text-4xl font-bold">
          Login
        </h1>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="mb-4 w-full rounded-2xl border p-4"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="mb-6 w-full rounded-2xl border p-4"
        />

        <button
          type="submit"
          className="w-full rounded-2xl bg-orange-500 p-4 font-bold text-white"
        >
          Entrar
        </button>
      </form>
    </main>
  )
}