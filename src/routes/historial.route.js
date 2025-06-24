import { Router } from 'express'
import { guardarHistorial, obtenerHistorial } from '../controllers/historial.controller.js'

const router = Router()

router.post('/', guardarHistorial)
router.get('/', obtenerHistorial)

export default router
