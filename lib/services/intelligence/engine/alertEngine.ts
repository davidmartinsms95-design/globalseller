import { ScoreResult } from './scoringEngine'

import type {
  ProductWithRelations,
} from '../shared/intelligence.types'

export type AlertSeverity =
  | 'critical'
  | 'high'
  | 'medium'
  | 'low'
  | 'info'

export interface IntelligenceAlert {
  id: string

  title: string

  description: string

  severity: AlertSeverity

  icon: string

  createdAt: Date
}

export function buildAlerts(
  product: ProductWithRelations,
  scores: ScoreResult,
): IntelligenceAlert[] {
  const alerts: IntelligenceAlert[] = []

  if (scores.stockScore === 0) {
    alerts.push({
      id: 'stock-critical',

      title: 'Estoque esgotado',

      description:
        'Este produto não possui estoque disponível.',

      severity: 'critical',

      icon: 'package',

      createdAt: new Date(),
    })
  }

  if (scores.healthScore < 60) {
    alerts.push({
      id: 'health-low',

      title: 'Health Score baixo',

      description:
        'A qualidade geral do anúncio precisa de melhorias.',

      severity: 'high',

      icon: 'activity',

      createdAt: new Date(),
    })
  }

  if (scores.seoScore < 70) {
    alerts.push({
      id: 'seo-warning',

      title: 'SEO abaixo do ideal',

      description:
        'O anúncio pode aparecer menos nas pesquisas.',

      severity: 'medium',

      icon: 'search',

      createdAt: new Date(),
    })
  }

  if (!product.image) {
    alerts.push({
      id: 'missing-image',

      title: 'Produto sem imagem',

      description:
        'Adicione imagens para aumentar a conversão.',

      severity: 'medium',

      icon: 'image',

      createdAt: new Date(),
    })
  }

  if (!product.description) {
    alerts.push({
      id: 'missing-description',

      title: 'Descrição ausente',

      description:
        'Produtos sem descrição tendem a vender menos.',

      severity: 'low',

      icon: 'file-text',

      createdAt: new Date(),
    })
  }

  if (!product.mlCategoryId) {
    alerts.push({
      id: 'missing-category',

      title: 'Categoria não definida',

      description:
        'Defina uma categoria para melhorar a indexação.',

      severity: 'low',

      icon: 'folder',

      createdAt: new Date(),
    })
  }

  if (
    alerts.length === 0 &&
    scores.finalScore >= 90
  ) {
    alerts.push({
      id: 'excellent',

      title: 'Produto saudável',

      description:
        'Nenhum problema relevante foi encontrado.',

      severity: 'info',

      icon: 'check-circle',

      createdAt: new Date(),
    })
  }

  return alerts
}