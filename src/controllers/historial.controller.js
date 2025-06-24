import { guardarHistorialService, obtenerHistorialService } from '../services/historial.service.js'

export const guardarHistorial = async (req, res) => {
  try {
    const { pregunta, respuesta } = req.body
    guardarHistorialService({ pregunta, respuesta })
    res.status(201).json({ mensaje: 'Historial guardado con éxito' })
  } catch (error) {
    console.error('Error al guardar historial:', error)
    res.status(500).json({ mensaje: 'Error al guardar historial' })
  }
}

export const obtenerHistorial = async (req, res) => {
  try {
    const historial = obtenerHistorialService()
    res.json(historial)
  } catch (error) {
    console.error('Error al obtener historial:', error)
    res.status(500).json({ mensaje: 'Error al obtener historial' })
  }
}
