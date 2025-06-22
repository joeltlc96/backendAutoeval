import React, { useState } from 'react'
import { obtenerPregunta } from '../api'

export default function PreguntaDinamica () {
  const [pregunta, setPregunta] = useState('')
  const [tema] = useState('Independencia de Ecuador')

  const generar = async () => {
    const data = await obtenerPregunta({ tema })
    if (data && data.pregunta) {
      setPregunta(data.pregunta)
    } else {
      setPregunta('No se pudo generar la pregunta')
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2> Pregunta Dinámica</h2>
      <p><strong>Tema:</strong> {tema}</p>
      <button onClick={generar}> Generar Pregunta</button>
      <div style={{ marginTop: '1rem' }}>
        <strong>{pregunta}</strong>
      </div>
    </div>
  )
}
