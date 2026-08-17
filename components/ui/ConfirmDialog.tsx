'use client'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">

        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

        <p className="mt-4 text-zinc-400">
          {description}
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-zinc-700 px-5 py-3 font-semibold text-zinc-300 transition hover:bg-zinc-800"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500 disabled:opacity-50"
          >
            {loading
              ? 'Excluindo...'
              : confirmText}
          </button>

        </div>

      </div>
    </div>
  )
}