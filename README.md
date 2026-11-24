# Boletim Escolar — React + Vite

Aplicação desenvolvida como Situação de Aprendizagem (SA) para a **Escola Estadual Horizonte** (demanda da **CodeLab Jr.**), permitindo calcular a média bimestral dos alunos, identificar automaticamente a situação acadêmica e alternar entre os temas claro e escuro.

## Funcionalidades

- **Formulário controlado com `useState`**: nome do aluno em estado de texto e as quatro notas bimestrais em um estado do tipo objeto (`{ n1, n2, n3, n4 }`), atualizado de forma imutável com o operador spread (`...`).
- **Prevenção de recarregamento e validação**: envio tratado pelo evento `onSubmit` com `evento.preventDefault()`, atributo `noValidate` no `<form>` e validação para campos vazios ou notas fora do intervalo de `0` a `10`.
- **Cálculo de média e regra de aprovação**:
  - Média $\ge 7,0$: **Aprovado** (verde)
  - Média de $5,0$ a $6,9$: **Recuperação** (laranja)
  - Média $< 5,0$: **Reprovado** (vermelho)
- **Tema claro e escuro**: alternância via estado booleano (`temaEscuro`) e variáveis CSS, com persistência no `localStorage`.
- **Detalhamento sob demanda**: botão para exibir ou ocultar as notas individuais de cada bimestre.
- **Layout responsivo**: organização em duas colunas no desktop e uma coluna em telas menores que `720px`.

## Uso do Operador Ternário na Aplicação

1. **`App.jsx`**: alterna a classe CSS do tema claro/escuro (`temaEscuro ? 'app app--escuro' : 'app'`).
2. **`Cabecalho.jsx`**: alterna o texto do botão de tema (`temaEscuro ? 'Tema claro' : 'Tema escuro'`).
3. **`CampoNota.jsx`**: define os atributos `min`, `max` e `step` apenas quando `tipo === 'number'`.
4. **`FormularioNotas.jsx`**: exibe a mensagem de erro condicionalmente (`erro ? <p className="formulario_erro">{erro}</p> : null`) e diferencia erro de campo vazio vs. nota fora do intervalo.
5. **`CartaoResultado.jsx`**: utiliza ternário encadeado para definir a situação (`Aprovado`, `Recuperação` ou `Reprovado`) e a classe CSS de cor correspondente, além de alternar entre `Ocultar notas ▲` e `Ver notas ▼`.

## Estrutura de Pastas

```text
boletim-escolar/
├── index.html
├── package.json
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    ├── App.css
    └── components/
        ├── Cabecalho.jsx
        ├── Cabecalho.css
        ├── CampoNota.jsx
        ├── CampoNota.css
        ├── FormularioNotas.jsx
        ├── FormularioNotas.css
        ├── CartaoResultado.jsx
        └── CartaoResultado.css
```

## Como Executar Localmente

```bash
npm install
npm run dev
```

Acesse no navegador o endereço local exibido pelo Vite (normalmente `http://localhost:5173`).

---

## Autoavaliação do Aluno

### 1. Reescreve o ternário da situação usando `if/else`. Qual forma você achou mais fácil de ler? Por quê?

```javascript
let situacao;

if (media >= 7) {
  situacao = 'Aprovado';
} else if (media >= 5) {
  situacao = 'Recuperação';
} else {
  situacao = 'Reprovado';
}
```

A estrutura com `if/else` é mais fácil de ler numa leitura rápida para quem está começando, porque separa cada faixa de média em blocos indentados explícitos. Já o operador ternário encadeado é mais compacto e funciona diretamente dentro de expressões no JSX ou na escolha dinâmica de classes CSS, desde que mantenha a ordem lógica das condições (`>= 7` antes de `>= 5`).

### 2. Por que `temaEscuro` fica no `App`, mas `mostrarNotas` fica no `CartaoResultado`?

O estado `temaEscuro` fica no `App` porque afeta a aplicação inteira e é compartilhado entre componentes diferentes: o `App` aplica a classe `.app--escuro` no contêiner principal para alterar as variáveis CSS do tema, enquanto o `Cabecalho` recebe `temaEscuro` e `aoTrocarTema` via `props` para atualizar o botão. Já o estado `mostrarNotas` controla apenas a exibição da lista de notas dentro do próprio `CartaoResultado`, mantendo o estado local isolado onde ele é realmente utilizado.

### 3. O que aconteceria se `alterarNota` não usasse `...notas`?

Se `alterarNota` fizesse `setNotas({ [campo]: valor })` sem espalhar o objeto anterior com `...notas`, o estado `notas` passaria a conter apenas a última nota digitada e apagaria as demais propriedades (`n1`, `n2`, `n3`, `n4`), quebrando os outros inputs controlados e o cálculo da média. Com `{ ...notas, [campo]: valor }`, cria-se um novo objeto preservando os valores anteriores e atualizando apenas o bimestre alterado.

### 4. Qual capacidade socioemocional você mais desenvolveu nesta SA?

Desenvolvi principalmente o **raciocínio lógico** e a **atenção a detalhes**, ao traduzir a regra pedagógica da escola ($\ge 7$, $5$ a $6,9$ e $< 5$) e as validações de intervalo ($0$ a $10$) para o código React, testando os valores limite e os estados visuais sem deixar passar falhas de lógica.