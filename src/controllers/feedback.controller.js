import axios from 'axios'
import { PRIVATE_KEY } from '../config.js'

export const generarFeedback = async (req, res) => {
  try {
    const { pregunta, respuesta } = req.body

    if (!pregunta || !respuesta) {
      return res.status(400).json({ mensaje: 'Faltan datos: pregunta o respuesta.' })
    }

    const prompt = `
    Actúa como un experto docente universitario. Analiza la siguiente respuesta de un estudiante con base en la pregunta dada. 
    Luego, proporciona una retroalimentación clara, breve, motivadora y constructiva. 
    Incluye también una puntuación del 1 al 10, según la calidad de la respuesta.

    Pregunta: ${pregunta}
    Respuesta del estudiante: ${respuesta}

    Retroalimentación:
    `

    const chatResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${PRIVATE_KEY}`
        }
      }
    )

    const feedback = chatResponse.data.choices[0].message.content

    res.status(200).json({ feedback })
  } catch (error) {
    console.error('Error generando feedback:', error)
    res.status(500).json({ mensaje: 'Error al generar feedback' })
  }
}
