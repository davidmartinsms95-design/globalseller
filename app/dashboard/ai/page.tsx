async function generateDescription() {
  try {
    setLoading(true)

    const response = await fetch(
      '/api/ai/generate-description',
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          title,
          category,
        }),
      }
    )

    const data = await response.json()

    setDescription(data.content)

    setLoading(false)
  } catch (error) {
    console.log(error)

    setLoading(false)
  }
}