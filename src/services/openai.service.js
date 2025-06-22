import axios from 'axios'
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export const generarPreguntaIA = async (tema) => {
  const prompt = `Genera una pregunta sencilla de opción múltiple sobre: ${tema}. Solo incluye la pregunta.`
  const { data } = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5,
    max_tokens: 100
  }, {
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}` }
  })

  return data.choices[0].message.content.trim()
}

export const evaluarRespuestaIA = async (pregunta, respuesta) => {
  const prompt = `Pregunta: ${pregunta}\nRespuesta del estudiante: ${respuesta}\n¿Está bien? Da retroalimentación breve, clara y educativa.`
  const { data } = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.6,
    max_tokens: 150
  }, {
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}` }
  })

  return data.choices[0].message.content.trim()
}
