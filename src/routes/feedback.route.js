// src/routes/feedback.route.js
import { Router } from 'express'
import { generarFeedback } from '../controllers/feedback.controller.js'

const router = Router()

router.post('/', generarFeedback)

export default router
