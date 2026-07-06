import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateProductDescription(
  title: string,
  description?: string
) {
  const prompt = `
Você é um especialista em e-commerce.

Crie uma descrição profissional para o seguinte produto.

Título:
${title}

Descrição atual:
${description ?? 'Não informada'}

A resposta deve conter:

- Introdução
- Benefícios
- Características
- Chamada para compra

Não utilize emojis.
`

  const response =
    await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    })

  return (
    response.choices[0].message.content ??
    ''
  )
}