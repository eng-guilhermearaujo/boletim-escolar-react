import { useState } from 'react'
import './CartaoResultado.css'

function CartaoResultado({ resultado }) {
  const [mostrarNotas, setMostrarNotas] = useState(false)

  if (resultado === null) {
    return (
      <section className="resultado resultado--vazio">
        <p>
          Preencha o formulário e clique em <strong>Calcular média</strong>.
        </p>
      </section>
    )
  }

  const { nome, notas, media } = resultado

  // Ternário encadeado define a situação pela média (>= 7, >= 5 ou < 5)
  const situacao =
    media >= 7 ? 'Aprovado' : media >= 5 ? 'Recuperação' : 'Reprovado'

  // Ternário encadeado escolhe a classe CSS conforme a situação
  const classeSituacao =
    media >= 7
      ? 'resultado--aprovado'
      : media >= 5
      ? 'resultado--recuperacao'
      : 'resultado--reprovado'

  return (
    <section className={`resultado ${classeSituacao}`}>
      <p className="resultado_nome">{nome}</p>
      <p className="resultado_media">{media.toFixed(1)}</p>
      <p className="resultado_situacao">{situacao}</p>

      <button
        type="button"
        className="resultado_detalhes"
        onClick={() => setMostrarNotas(!mostrarNotas)}
      >
        {mostrarNotas ? 'Ocultar notas ▲' : 'Ver notas ▼'}
      </button>

      {mostrarNotas ? (
        <ul className="resultado_lista">
          {notas.map((nota, indice) => (
            <li key={indice}>
              {indice + 1}º bimestre: <strong>{nota.toFixed(1)}</strong>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

export default CartaoResultado