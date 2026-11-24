import { useEffect, useState } from 'react'
import Cabecalho from './components/Cabecalho'
import FormularioNotas from './components/FormularioNotas'
import CartaoResultado from './components/CartaoResultado'
import './App.css'

const CHAVE_TEMA = 'escola_horizonte_tema_escuro'

function App() {
  const [temaEscuro, setTemaEscuro] = useState(() => {
    try {
      return localStorage.getItem(CHAVE_TEMA) === 'true'
    } catch {
      return false
    }
  })
  const [resultado, setResultado] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_TEMA, String(temaEscuro))
    } catch {
      // ignora erro de armazenamento em ambientes restritos
    }
  }, [temaEscuro])

  function trocarTema() {
    setTemaEscuro(!temaEscuro)
  }

  return (
    <div className={temaEscuro ? 'app app--escuro' : 'app'}>
      <Cabecalho temaEscuro={temaEscuro} aoTrocarTema={trocarTema} />

      <main className="app_conteudo">
        <FormularioNotas aoCalcular={setResultado} />
        <CartaoResultado resultado={resultado} />
      </main>
    </div>
  )
}

export default App