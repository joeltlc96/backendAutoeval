import { Router } from 'express'
import { generarPregunta } from '../controllers/pregunta.controller.js'

const router = Router()

router.post('/pregunta', generarPregunta)

export default router
