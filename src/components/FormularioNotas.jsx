import { useState } from 'react'
import CampoNota from './CampoNota'
import './FormularioNotas.css'

const NOTAS_INICIAIS = { n1: '', n2: '', n3: '', n4: '' }

function FormularioNotas({ aoCalcular }) {
  const [nome, setNome] = useState('')
  const [notas, setNotas] = useState(NOTAS_INICIAIS)
  const [erro, setErro] = useState('')

  function alterarNota(campo, valor) {
    setNotas({ ...notas, [campo]: valor })
  }

  function calcular(evento) {
    evento.preventDefault()

    const valores = Object.values(notas).map(Number)
    const temVazio = nome.trim() === '' || Object.values(notas).includes('')
    const foraDoIntervalo = valores.some((nota) => Number.isNaN(nota) || nota < 0 || nota > 10)

    if (temVazio || foraDoIntervalo) {
      setErro(
        temVazio
          ? 'Preencha o nome e as 4 notas.'
          : 'As notas devem estar entre 0 e 10.'
      )
      return
    }

    const media = valores.reduce((soma, nota) => soma + nota, 0) / valores.length
    aoCalcular({
      nome: nome.trim(),
      notas: valores,
      media
    })
    setErro('')
  }

  function limpar() {
    setNome('')
    setNotas(NOTAS_INICIAIS)
    setErro('')
    aoCalcular(null)
  }

  return (
    <form className="formulario" onSubmit={calcular} noValidate>
      <h2>Lançar notas</h2>

      <CampoNota
        id="nome"
        label="Nome do aluno"
        tipo="text"
        valor={nome}
        aoAlterar={setNome}
        placeholder="Ex.: Maria Silva"
      />

      <div className="formulario_notas">
        <CampoNota
          id="n1"
          label="1º bimestre"
          valor={notas.n1}
          aoAlterar={(v) => alterarNota('n1', v)}
        />
        <CampoNota
          id="n2"
          label="2º bimestre"
          valor={notas.n2}
          aoAlterar={(v) => alterarNota('n2', v)}
        />
        <CampoNota
          id="n3"
          label="3º bimestre"
          valor={notas.n3}
          aoAlterar={(v) => alterarNota('n3', v)}
        />
        <CampoNota
          id="n4"
          label="4º bimestre"
          valor={notas.n4}
          aoAlterar={(v) => alterarNota('n4', v)}
        />
      </div>

      {/* Ternário exibe a mensagem de erro apenas quando erro não estiver vazio */}
      {erro ? <p className="formulario_erro">{erro}</p> : null}

      <div className="formulario_botoes">
        <button type="submit" className="botao botao--principal">
          Calcular média
        </button>
        <button type="button" className="botao" onClick={limpar}>
          Limpar
        </button>
      </div>
    </form>
  )
}

export default FormularioNotas