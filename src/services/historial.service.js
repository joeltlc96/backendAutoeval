const memoria = []

export const guardarHistorial = ({ pregunta, respuesta }) => {
  memoria.push({ pregunta, respuesta })
}

export const obtenerHistorial = () => {
  return memoria
}
