import { Router } from 'express'
import { obtenerHistorialController } from '../controllers/historial.controller.js'

const router = Router()

// ✅ Ruta para obtener el historial de preguntas y respuestas
router.get('/historial', obtenerHistorialController)

export default router
