import axios from 'axios'
import { OPENAI_API_KEY } from '../config.js'

export const generarPreguntaDesdeOpenAI = async (tema) => {
  const prompt = `Genera una pregunta de opción múltiple sobre el tema: ${tema}. Solo incluye la pregunta.`

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 100
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  )

  return response.data.choices[0].message.content.trim()
}
