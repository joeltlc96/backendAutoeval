import express from 'express'
import { PORT } from './config.js'
import morgan from 'morgan'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import preguntaRoutes from './routes/pregunta.route.js'
import historialRoutes from './routes/historial.route.js'
import { logSpecificRequest } from './middlewares/loggerMiddleware.js'
import { VerificarToken } from './middlewares/authMiddleware.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

//  Middlewares opcionales
app.use(morgan('dev'))
// app.use(logRequest)

//  Rutas protegidas
app.use('/api/users', VerificarToken, userRouter)

//  Rutas públicas
app.use('/api/auth', authRouter)
app.use('/api', preguntaRoutes)
app.use('/api', historialRoutes)

// Ruta de prueba
app.get('/', logSpecificRequest, (req, res) => {
  res.send('Hola Mundo desde Autoeval API')
})

app.listen(PORT, () => console.log(`Backend escuchando en el puerto ${PORT}`))
