import { NextResponse } from 'next/server'

import { openai } from '../../../../lib/openai'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      title,
      category,
      cost,
      marketplace,
    } = body

    if (
      !title ||
      !category ||
      !cost
    ) {
      return NextResponse.json(
        {
          error: 'Dados obrigatórios',
        },
        {
          status: 400,
        }
      )
    }

    if (!openai) {
      return NextResponse.json(
        {
          error: 'OpenAI não configurada',
        },
        {
          status: 500,
        }
      )
    }

    const completion =
      await openai.chat.completions.create({
        model: 'gpt-4o-mini',

        messages: [
          {
            role: 'system',

            content: `
Você é um especialista em precificação para e-commerce e marketplaces.

Analise:
- margem lucro
- competitividade
- estratégia vendas
- marketplaces
- potencial comercial

Responda de forma profissional e estratégica.
            `,
          },

          {
            role: 'user',

            content: `
Produto: ${title}

Categoria: ${category}

Custo Produto: R$ ${cost}

Marketplace: ${
              marketplace ||
              'mercadolivre'
            }

Crie:
- preço sugerido
- margem estimada
- estratégia comercial
- insights vendas
- recomendação marketplace
            `,
          },
        ],

        temperature: 0.8,
      })

    const content =
      completion.choices[0].message.content

    return NextResponse.json({
      content,
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      {
        error: 'Erro IA pricing',
      },
      {
        status: 500,
      }
    )
  }
}

