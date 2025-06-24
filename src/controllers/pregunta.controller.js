// src/controllers/pregunta.controller.js
export const generarPregunta = async (req, res) => {
  const { tema } = req.body

  if (!tema) {
    return res.status(400).json({ error: 'El tema es requerido' })
  }

  // Simulación de generación de pregunta
  const pregunta = `¿Qué sabes sobre el tema "${tema}"?`
  res.json({ pregunta })
}
