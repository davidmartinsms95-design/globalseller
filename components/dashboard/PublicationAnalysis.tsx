interface Props {
  score: number
  suggestions: string[]
}

export default function PublicationAnalysis({
  score,
  suggestions,
}: Props) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Análise Inteligente
      </h2>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-zinc-400">
            Qualidade do anúncio
          </span>

          <span className="font-bold text-green-400">
            {score}%
          </span>
        </div>

        <div className="h-4 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-green-500 transition-all"
            style={{
              width: `${score}%`,
            }}
          />
        </div>
      </div>

      <div className="space-y-3">

        <h3 className="font-semibold text-white">
          Sugestões
        </h3>

        {suggestions.length === 0 ? (
          <p className="text-green-400">
            ✔ Seu anúncio está excelente.
          </p>
        ) : (
          suggestions.map((item) => (
            <div
              key={item}
              className="rounded-xl bg-zinc-800 p-3"
            >
              {item}
            </div>
          ))
        )}

      </div>

    </div>
  )
}