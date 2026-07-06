import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateProductTitle(
  title: string
) {
  const prompt = `
Você é especialista em Mercado Livre.

Reescreva o título abaixo para gerar mais cliques.

Regras:

- máximo 60 caracteres
- otimizado para SEO
- sem emojis
- sem palavras repetidas
- profissional

Título:

${title}
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
      temperature: 0.6,
    })

  return (
    response.choices[0].message.content ??
    title
  )
}