import axios from 'axios'

const API_URL = 'http://localhost:3001/api' // Cambia esto si tu backend usa otro puerto o está online

// Enviar tema, respuesta anterior y si fue correcta (opcional)
export const obtenerPregunta = async ({ tema, respuesta, esCorrecta }) => {
  try {
    const response = await axios.post(`${API_URL}/pregunta`, {
      tema,
      respuesta,
      esCorrecta
    })
    return response.data
  } catch (error) {
    console.error('Error al obtener la pregunta:', error)
    return { error: 'No se pudo generar la pregunta' }
  }
}
