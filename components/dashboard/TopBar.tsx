'use client'

import {
  Bell,
  Search,
  Settings,
  User,
  LogOut,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Notifications from './Notifications'

export default function TopBar() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    async function loadNotifications() {
      try {
        const response = await fetch('/api/notifications')
        const data = await response.json()

        setNotifications(data)
      } catch (error) {
        console.error(error)
      }
    }

    loadNotifications()
  }, [])

  return (
    <>
      <header className="mb-8 flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-zinc-500">
            Bem-vindo ao GlobalSeller
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2">
            <Search
              size={18}
              className="mr-2 text-zinc-500"
            />

            <input
              placeholder="Pesquisar..."
              className="bg-transparent outline-none"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="rounded-xl border border-zinc-700 bg-zinc-900 p-3 transition hover:bg-zinc-800"
            >
              <Bell size={20} />
            </button>

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {notifications.length}
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2">
            <User size={18} />

            <div>
              <p className="text-sm font-semibold">
                Minha Conta
              </p>

              <p className="text-xs text-zinc-500">
                Reseller
              </p>
            </div>

            <Settings
              size={18}
              className="cursor-pointer text-zinc-500 transition hover:text-white"
            />

            <LogOut
              size={18}
              className="cursor-pointer text-zinc-500 transition hover:text-red-500"
            />
          </div>
        </div>
      </header>

      {open && (
        <div className="absolute right-8 top-24 z-50 w-[420px]">
          <Notifications />
        </div>
      )}
    </>
  )
}