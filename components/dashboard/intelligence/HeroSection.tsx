'use client'

import { Brain } from 'lucide-react'

import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'

export default function HeroSection() {
  return (
    <Card>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Brain
              size={28}
              className="text-orange-400"
            />

            <h1 className="text-4xl font-bold text-white">
              Central de Inteligência
            </h1>
          </div>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
            Painel executivo alimentado por Inteligência Artificial
            para análise, otimização e crescimento dos seus anúncios.
          </p>
        </div>

        <Badge variant="premium">
          GlobalSeller AI
        </Badge>
      </div>
    </Card>
  )
}