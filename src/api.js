import axios from 'axios'

const API_URL = 'http://localhost:3001/api' // Asegúrate que el puerto sea correcto

// ✅ Obtener pregunta dinámica
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

// ✅ Obtener historial de preguntas
export const obtenerHistorial = async () => {
  try {
    const response = await axios.get(`${API_URL}/historial`)
    return response.data
  } catch (error) {
    console.error('Error al obtener el historial:', error)
    return []
  }
}
