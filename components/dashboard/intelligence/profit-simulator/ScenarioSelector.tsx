import {
  ScenarioKey,
} from './types'

interface ScenarioOption {
  id: ScenarioKey
  label: string
}

interface ScenarioSelectorProps {
  selectedScenario: ScenarioKey
  onSelect: (
    scenario: ScenarioKey,
  ) => void
}

const SCENARIOS: ScenarioOption[] = [
  {
    id: 'conservative',
    label: 'Conservador',
  },
  {
    id: 'competitive',
    label: 'Competitivo',
  },
  {
    id: 'premium',
    label: 'Premium',
  },
  {
    id: 'clearance',
    label: 'Liquidar Estoque',
  },
]

export default function ScenarioSelector({
  selectedScenario,
  onSelect,
}: ScenarioSelectorProps) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500">
        Cenários Inteligentes
      </h3>

      <div className="flex flex-wrap gap-3">
        {SCENARIOS.map((scenario) => {
          const active =
            scenario.id ===
            selectedScenario

          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() =>
                onSelect(scenario.id)
              }
              className={`
                rounded-xl
                border
                px-5
                py-3
                text-sm
                font-medium
                transition
                ${
                  active
                    ? `
                      border-orange-500
                      bg-orange-500/10
                      text-orange-300
                    `
                    : `
                      border-zinc-700
                      text-white
                      hover:border-orange-500
                    `
                }
              `}
            >
              {scenario.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}