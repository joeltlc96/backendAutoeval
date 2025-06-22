import { generarPreguntaDesdeOpenAI } from '../services/openai.service.js'
import { guardarHistorialService } from '../services/historial.service.js'

export const generarPregunta = async (req, res) => {
  try {
    const { tema } = req.body

    if (!tema) {
      return res.status(400).json({ mensaje: 'Tema es requerido' })
    }

    const pregunta = await generarPreguntaDesdeOpenAI(tema)

    guardarHistorialService({
      pregunta,
      respuesta: null // aún no respondida
    })

    res.status(200).json({ pregunta })
  } catch (error) {
    console.error('Error al generar pregunta:', error)
    res.status(500).json({ mensaje: 'Error al generar pregunta' })
  }
}
