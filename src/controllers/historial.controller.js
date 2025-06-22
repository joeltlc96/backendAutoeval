// historial.controller.js
import { guardarHistorialService, obtenerHistorialService } from '../services/historial.service.js'

export const guardarHistorialController = (req, res) => {
  const { pregunta, respuesta } = req.body
  guardarHistorialService({ pregunta, respuesta })
  res.status(201).json({ mensaje: 'Historial guardado' })
}

export const obtenerHistorialController = (req, res) => {
  const historial = obtenerHistorialService()
  res.json(historial)
}
