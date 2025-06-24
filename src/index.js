import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.route.js'
import preguntaRoutes from './routes/pregunta.route.js'
import feedbackRoutes from './routes/feedback.route.js'
import historialRoutes from './routes/historial.route.js'
import { PORT } from './config.js'

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/pregunta', preguntaRoutes)
app.use('/api/feedback', feedbackRoutes)
app.use('/api/historial', historialRoutes)

app.get('/', (req, res) => {
  res.send('🚀 Backend AutoEval funcionando correctamente')
})

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
})
