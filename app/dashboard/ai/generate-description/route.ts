import { NextResponse } from 'next/server'
import { openai } from '../../../../lib/openai'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { title, category } = body

    if (!title || !category) {
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
Você é um especialista em copywriting para marketplaces.

Crie descrições:
- persuasivas
- profissionais
- SEO otimizadas
- focadas em vendas
- com emojis moderados
- prontas para Mercado Livre e Shopee
            `,
          },
          {
            role: 'user',
            content: `
Produto: ${title}

Categoria: ${category}

Crie:
- título otimizado
- descrição profissional
- benefícios
- gatilhos de venda
- CTA final
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
        error: 'Erro gerar descrição IA',
      },
      {
        status: 500,
      }
    )
  }
}

