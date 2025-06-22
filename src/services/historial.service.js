const memoria = []

export const guardarHistorialService = ({ pregunta, respuesta }) => {
  memoria.push({ pregunta, respuesta })
}

export const obtenerHistorialService = () => {
  return memoria
}
