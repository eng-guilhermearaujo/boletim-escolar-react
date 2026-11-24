import './Cabecalho.css'

function Cabecalho({ temaEscuro, aoTrocarTema }) {
  return (
    <header className="cabecalho">
      <div>
        <h1>Boletim Escolar</h1>
        <p>Calcule a média e descubra a situação do aluno</p>
      </div>

      {/* Ternário alterna o texto do botão de tema */}
      <button
        type="button"
        className="cabecalho_tema"
        onClick={aoTrocarTema}
      >
        {temaEscuro ? 'Tema claro' : 'Tema escuro'}
      </button>
    </header>
  )
}

export default Cabecalho