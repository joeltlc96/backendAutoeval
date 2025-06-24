// src/routes/pregunta.route.js
import { Router } from 'express'
import { generarPregunta } from '../controllers/pregunta.controller.js'

const router = Router()

router.post('/', generarPregunta)

export default router
