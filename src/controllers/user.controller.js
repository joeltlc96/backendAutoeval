import cache from '../cache.js'
import { prisma } from '../db.js'
import { encryptPassword } from '../tools/security.js'

export const getUsers = async (req, res) => {
  console.log(`Petición hecha por ${req.session.user}`)
  const cacheKeyAllUsers = 'AllUsers'

  if (cache.has(cacheKeyAllUsers)) {
    console.log('Desde la caché')
    const users = cache.get(cacheKeyAllUsers)
    res.json(users)
    return
  }

  console.log('Consulta desde la base de datos')
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      isActive: true,
      createdAt: true
    }
  })
  cache.set(cacheKeyAllUsers, users)
  res.json(users)
}

export const getUserById = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      isActive: true,
      createdAt: true
    }
  })

  if (!user) {
    res.status(404).json({ mensaje: 'Usuario no encontrado' })
  }

  res.json(user)
}

export const createUser = async (req, res) => {
  const newUser = req.body

  const user = await prisma.user.findUnique({
    where: { username: newUser.username }
  })

  if (user) {
    res.status(400)
      .json({ mensaje: `${user.username} no está disponible` })
    return
  }

  const hashPassword = await encryptPassword(newUser.password)
  newUser.password = hashPassword

  const createdUser = await prisma.user.create({
    data: newUser
  })

  const { password: _, ...userData } = createdUser

  res.json(userData)
}
