'use client'

import { useState } from 'react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] =
    useState('')

  async function handleRegister(
    e: React.FormEvent
  ) {
    e.preventDefault()

    const response = await fetch(
      '/api/register',
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    )

    if (response.ok) {
      alert('Usuário criado!')
    } else {
      alert('Erro ao criar usuário')
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-8">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-3xl bg-zinc-900 p-10"
      >
        <h1 className="mb-8 text-4xl font-bold text-white">
          Criar Admin
        </h1>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="mb-4 w-full rounded-2xl bg-zinc-800 p-4 text-white"
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="mb-4 w-full rounded-2xl bg-zinc-800 p-4 text-white"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="mb-6 w-full rounded-2xl bg-zinc-800 p-4 text-white"
        />

        <button
          type="submit"
          className="w-full rounded-2xl bg-orange-500 p-4 font-bold text-white"
        >
          Criar Conta
        </button>
      </form>
    </main>
  )
}