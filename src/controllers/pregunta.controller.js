import { generarPreguntaIA, evaluarRespuestaIA } from '../services/openai.service.js'
import { guardarHistorial, obtenerHistorial } from '../services/historial.service.js'

export const generarPregunta = async (req, res) => {
  const { tema } = req.body
  if (!tema) return res.status(400).json({ mensaje: 'Tema es requerido' })

  const pregunta = await generarPreguntaIA(tema)
  res.json({ pregunta })
}

export const enviarRespuesta = async (req, res) => {
  const { pregunta, respuesta } = req.body
  if (!pregunta || !respuesta) {
    return res.status(400).json({ mensaje: 'Faltan datos' })
  }

  const feedback = await evaluarRespuestaIA(pregunta, respuesta)
  await guardarHistorial({ pregunta, respuesta })
  res.json({ feedback })
}

export const mostrarHistorial = async (req, res) => {
  const historial = await obtenerHistorial()
  res.json({ historial })
}
