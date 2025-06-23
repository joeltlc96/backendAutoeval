import jwt from 'jsonwebtoken'
import { prisma } from '../db.js'
import { encryptPassword, validatePassword } from '../tools/security.js'
import { PRIVATE_KEY } from '../config.js'

// ✅ REGISTRO
const register = async (req, res) => {
  try {
    const { username, name, email, password } = req.body

    if (!username || !name || !email || !password) {
      return res.status(400).json({ mensaje: 'Todos los campos son requeridos' })
    }

    const existe = await prisma.user.findUnique({ where: { email } })
    if (existe) {
      return res.status(400).json({ mensaje: 'Ya existe un usuario con ese correo' })
    }

    const hashedPassword = await encryptPassword(password)

    const nuevoUsuario = await prisma.user.create({
      data: {
        username,
        name,
        email,
        password: hashedPassword,
        isActive: true
      }
    })

    const token = jwt.sign({ id: nuevoUsuario.id }, PRIVATE_KEY, { expiresIn: '1h' })

    res.status(201).json({
      mensaje: 'Registro exitoso',
      user: {
        id: nuevoUsuario.id,
        username: nuevoUsuario.username,
        name: nuevoUsuario.name,
        email: nuevoUsuario.email
      },
      token
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ mensaje: 'Error al registrar usuario' })
  }
}

// ✅ LOGIN
const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ mensaje: 'Username y password son requeridos' })
  }

  const user = await prisma.user.findUnique({
    where: { username }
  })

  if (!user) {
    return res.status(400).json({ mensaje: 'Usuario no encontrado' })
  }

  const isValid = await validatePassword(password, user.password)
  if (!isValid) {
    return res.status(401).json({ mensaje: 'Contraseña incorrecta' })
  }

  const token = jwt.sign({ username: user.username }, PRIVATE_KEY, { expiresIn: '1h' })

  const { password: _, ...userData } = user

  res.cookie('access_token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  }).json({ user: userData, token })
}

// ✅ LOGOUT
const logout = (req, res) => {
  res.clearCookie('access_token').end()
}

// ✅ EXPORTA TODO
export { register, login, logout }
