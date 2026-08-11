import {
  AiRecommendation,
  ProductHealthResult,
  ProfitSimulationResult,
  SeoScoreResult,
} from './types'

export interface RecommendationInput {
  health: ProductHealthResult

  seo: SeoScoreResult

  profit?: ProfitSimulationResult
}

function add(
  list: AiRecommendation[],
  title: string,
  description: string,
  priority: AiRecommendation['priority'],
) {
  list.push({
    title,
    description,
    priority,
  })
}

export function generateRecommendations(
  input: RecommendationInput,
): AiRecommendation[] {
  const recommendations: AiRecommendation[] = []

  // ------------------------
  // HEALTH SCORE
  // ------------------------

  if (input.health.score < 50) {
    add(
      recommendations,
      'Melhore a qualidade do anúncio',
      'O Health Score está muito baixo. Complete todas as informações do produto.',
      'high',
    )
  }

  if (input.health.title < 15) {
    add(
      recommendations,
      'Título pouco otimizado',
      'Utilize palavras-chave relevantes e torne o título mais descritivo.',
      'high',
    )
  }

  if (input.health.description < 15) {
    add(
      recommendations,
      'Descrição incompleta',
      'Adicione benefícios, especificações técnicas e perguntas frequentes.',
      'high',
    )
  }

  if (input.health.image < 15) {
    add(
      recommendations,
      'Imagem principal',
      'Adicione imagens de alta resolução com fundo limpo.',
      'high',
    )
  }

  if (input.health.stock < 10) {
    add(
      recommendations,
      'Estoque baixo',
      'Evite perder vendas mantendo um estoque adequado.',
      'medium',
    )
  }

  if (input.health.status < 15) {
    add(
      recommendations,
      'Produto inativo',
      'Ative o anúncio para aumentar a exposição.',
      'high',
    )
  }

  // ------------------------
  // SEO
  // ------------------------

  if (input.seo.score < 60) {
    add(
      recommendations,
      'SEO abaixo do ideal',
      'Melhore título, descrição e palavras-chave para aumentar o ranqueamento.',
      'high',
    )
  }

  if (input.seo.titleLength < 60) {
    add(
      recommendations,
      'Título curto',
      'Aproveite melhor o limite de caracteres do marketplace.',
      'medium',
    )
  }

  if (input.seo.descriptionLength < 500) {
    add(
      recommendations,
      'Descrição pequena',
      'Descrições completas aumentam confiança e conversão.',
      'medium',
    )
  }

  if (!input.seo.hasCategory) {
    add(
      recommendations,
      'Categoria ausente',
      'Defina corretamente a categoria do produto.',
      'high',
    )
  }

  if (!input.seo.hasImage) {
    add(
      recommendations,
      'Imagem ausente',
      'Produtos com imagens possuem muito mais cliques.',
      'high',
    )
  }

  // ------------------------
  // LUCRO
  // ------------------------

  if (input.profit) {
    if (input.profit.netProfit <= 0) {
      add(
        recommendations,
        'Produto sem lucro',
        'Revise custos ou aumente o preço de venda.',
        'high',
      )
    }

    if (input.profit.margin < 10) {
      add(
        recommendations,
        'Margem muito baixa',
        'Busque fornecedores melhores ou ajuste o preço.',
        'high',
      )
    }

    if (input.profit.roi < 20) {
      add(
        recommendations,
        'ROI baixo',
        'Priorize produtos com maior retorno sobre investimento.',
        'medium',
      )
    }
  }

  // ------------------------
  // BOAS PRÁTICAS
  // ------------------------

  if (input.health.score >= 90 && input.seo.score >= 90) {
    add(
      recommendations,
      'Excelente anúncio',
      'Seu anúncio está muito bem otimizado. Considere investir em anúncios patrocinados.',
      'low',
    )
  }

  if (recommendations.length === 0) {
    add(
      recommendations,
      'Nenhuma melhoria crítica',
      'O anúncio apresenta ótima qualidade. Continue acompanhando o desempenho.',
      'low',
    )
  }

  return sortRecommendations(recommendations)
}

export function sortRecommendations(
  recommendations: AiRecommendation[],
): AiRecommendation[] {
  const priorityOrder = {
    high: 0,
    medium: 1,
    low: 2,
  }

  return [...recommendations].sort(
    (a, b) =>
      priorityOrder[a.priority] -
      priorityOrder[b.priority],
  )
}

export function countRecommendations(
  recommendations: AiRecommendation[],
) {
  return {
    total: recommendations.length,

    high: recommendations.filter(
      (r) => r.priority === 'high',
    ).length,

    medium: recommendations.filter(
      (r) => r.priority === 'medium',
    ).length,

    low: recommendations.filter(
      (r) => r.priority === 'low',
    ).length,
  }
}