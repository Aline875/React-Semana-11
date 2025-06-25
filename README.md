# React Semana 11 - Hooks Fundamentais

Este repositório contém exemplos práticos e educacionais dos principais hooks do React: **useState** e **useEffect**. O código está implementado diretamente no `App.js` de cada exemplo, facilitando o foco nos conceitos fundamentais.

## Conteúdo

### 1. **useState** - Gerenciamento de Estado
**Localização:** `exe-1/src/App.js`

Um placar interativo de futebol que demonstra:
- Declaração e uso do hook useState
- Múltiplos estados independentes
- Funções que modificam estado
- Re-renderização automática
- Estilização dinâmica baseada em estado

### 2. **useEffect** - Efeitos Colaterais
**Localização:** `exe-2/src/App.js`

Um contador automático que demonstra:
- Declaração e uso do hook useEffect
- Array de dependências
- Função de limpeza (cleanup)
- Timers com setInterval
- Ciclo de vida de efeitos

## Objetivos de Aprendizado

### useState
- Como declarar estado em componentes funcionais
- Diferença entre valor do estado e função setter
- Estados independentes e múltiplos
- Atualização assíncrona de estado
- Batching de atualizações do React
- Renderização condicional baseada em estado

### useEffect
- Conceito de efeitos colaterais
- Quando e como usar useEffect
- Array de dependências e suas implicações
- Função de limpeza para evitar vazamentos
- Gerenciamento de timers e intervalos
- Closure e como evitar valores desatualizados

## Como Executar

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/React-Semana-11.git

# Entre na pasta
cd React-Semana-11
```

### Executar os exemplos

**Para o exemplo de useState (exe-1):**
```bash
cd exe-1
npm install
npm start
```

**Para o exemplo de useEffect (exe-2):**
```bash
cd exe-2
npm install
npm start
```

Cada exemplo roda em uma aplicação React separada, permitindo focar em um conceito por vez.

## Estrutura do Projeto

```
React-Semana-11/
├── exe-1/                      # Exemplo useState
│   ├── src/
│   │   ├── App.js              # Componente principal com useState
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── exe-2/                      # Exemplo useEffect
│   ├── src/
│   │   ├── App.js              # Componente principal com useEffect
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── LICENSE
└── README.md
```

## Guia de Estudo

### 1. Começando com useState

O **useState** é o hook mais fundamental do React. Ele permite adicionar estado a componentes funcionais.

**Sintaxe básica:**
```javascript
const [estado, setEstado] = useState(valorInicial);
```

**Exemplo prático (exe-1/src/App.js):**
```javascript
function App() {
  const [golsTimeA, setGolsTimeA] = useState(0);
  const [golsTimeB, setGolsTimeB] = useState(0);
  
  // Função para adicionar gol
  const adicionarGol = (time) => {
    if (time === 'A') {
      setGolsTimeA(golsTimeA + 1);
    } else {
      setGolsTimeB(golsTimeB + 1);
    }
  };
  
  return (
    // JSX do componente
  );
}
```

**Pontos importantes:**
- O estado é **imutável** - nunca modifique diretamente
- Use sempre a função setter para atualizar
- A atualização é **assíncrona**
- React re-renderiza automaticamente quando o estado muda

### 2. Avançando com useEffect

O **useEffect** permite executar efeitos colaterais em componentes funcionais.

**Sintaxe básica:**
```javascript
useEffect(() => {
  // Código do efeito
  
  return () => {
    // Função de limpeza (opcional)
  };
}, [dependências]); // Array de dependências
```

**Exemplo prático (exe-2/src/App.js):**
```javascript
function App() {
  const [contador, setContador] = useState(0);
  const [ativo, setAtivo] = useState(false);
  
  useEffect(() => {
    let interval = null;
    
    if (ativo) {
      interval = setInterval(() => {
        setContador(contador => contador + 1);
      }, 1000);
    }
    
    // Função de limpeza
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [ativo]); // Dependência: só executa quando 'ativo' muda
  
  return (
    // JSX do componente
  );
}
```

**Padrões de dependências:**
- `[]` - Executa apenas uma vez (componentDidMount)
- `[var1, var2]` - Executa quando var1 ou var2 mudam
- `undefined` - Executa após cada render (cuidado!)

## Recursos Visuais

Ambos os exemplos incluem:
- Design moderno com gradientes e animações
- Interface responsiva que funciona em diferentes tamanhos
- Animações CSS para feedback visual
- Estados visuais que refletem os estados internos
- Transições suaves para uma melhor experiência

## Conceitos Importantes

### Estado vs Props
- **Estado:** Dados que podem mudar ao longo do tempo
- **Props:** Dados passados de componente pai para filho

### Re-renderização
- React re-renderiza quando estado ou props mudam
- Use React DevTools para visualizar re-renderizações

### Closure em useEffect
- Cuidado com valores "presos" no closure
- Use funções de atualização: `setEstado(prev => prev + 1)`

### Limpeza de Efeitos
- Sempre limpe timers, subscriptions, etc.
- Use a função de retorno do useEffect

## Tecnologias Utilizadas

- **React 18+** - Biblioteca principal
- **Hooks** - useState, useEffect
- **Create React App** - Setup e configuração inicial
- **CSS** - Estilização com arquivos .css
- **JavaScript ES6+** - Arrow functions, destructuring, etc.

## Exercícios Sugeridos

### Para useState (exe-1):
1. Adicione um terceiro time ao placar
2. Implemente histórico de gols
3. Adicione validação (gols não podem ser negativos)
4. Crie diferentes tipos de pontuação (gol, cartão, etc.)
5. Adicione botão de reset do placar

### Para useEffect (exe-2):
1. Adicione controle de velocidade do contador
2. Implemente contador regressivo
3. Adicione persistência usando localStorage
4. Crie notificações em marcos específicos
5. Implemente pausa/resume do contador

## Dicas de Desenvolvimento

### Estrutura Simples
- Manter o código no `App.js` é perfeito para aprendizado
- Foque em entender os hooks antes de modularizar
- Comentários no código ajudam na compreensão

### Debug e Testes
- Use `console.log()` para entender o fluxo de execução
- React DevTools é essencial para visualizar estados
- Teste diferentes cenários manualmente

### Próximos Passos
- Depois de dominar os conceitos, extraia para componentes separados
- Experimente outros hooks: `useReducer`, `useContext`, `useMemo`
- Implemente formulários com validação

## Contribuindo

Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Adicionar novos exemplos
- Melhorar a documentação
- Compartilhar suas implementações

## Recursos Adicionais

- [Documentação Oficial do React](https://react.dev)
- [Hooks API Reference](https://react.dev/reference/react)
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [Create React App Documentation](https://create-react-app.dev/)
- [MDN JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

## Licença

Este projeto é desenvolvido para fins educacionais. Sinta-se livre para usar, modificar e distribuir.

---

**Desenvolvido com dedicação para aprender React Hooks**

> **Dica:** Execute os exemplos, leia os comentários no código e experimente modificar os valores para entender melhor como os hooks funcionam! Comece sempre pelo `App.js` de cada pasta.
