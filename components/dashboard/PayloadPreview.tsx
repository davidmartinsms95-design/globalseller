interface Props {
  payload: any
}

export default function PayloadPreview({
  payload,
}: Props) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Payload Mercado Livre
      </h2>

      <pre className="overflow-auto rounded-2xl bg-black p-6 text-sm text-green-400">
        {JSON.stringify(
          payload,
          null,
          2
        )}
      </pre>

    </div>
  )
}