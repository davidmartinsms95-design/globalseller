'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/dashboard',
    })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="mb-8 text-4xl font-bold">
          Login
        </h1>

        <input
          type="email"
          placeholder="E-mail"
          className="mb-4 w-full rounded-2xl border p-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="mb-6 w-full rounded-2xl border p-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full rounded-2xl bg-orange-500 p-4 font-bold text-white"
        >
          Entrar
        </button>
      </div>
    </main>
  )
}