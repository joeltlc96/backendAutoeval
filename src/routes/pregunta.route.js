import { Router } from 'express'
import { generarPregunta, enviarRespuesta, mostrarHistorial } from '../controllers/pregunta.controller.js'

const router = Router()

router.post('/pregunta', generarPregunta)
router.post('/feedback', enviarRespuesta)
router.get('/historial', mostrarHistorial)

export default router
