import { useState } from "react";

function PlacarJogo() {
  /* 
  ═══════════════════════════════════════════════════════════════════════════════
   ENTENDENDO O useState - GERENCIAMENTO DE ESTADO EM REACT
  ═══════════════════════════════════════════════════════════════════════════════
  
  O useState é um HOOK que permite adicionar estado a componentes funcionais.
  Antes dos hooks, apenas componentes de classe podiam ter estado.
  
  SINTAXE: const [valor, setValor] = useState(valorInicial)
  
  - valor: é a variável que contém o estado atual
  - setValor: é a função que atualiza o estado
  - valorInicial: é o valor que o estado terá na primeira renderização
  */

  //  ESTADO 1: Gols do Time A
  // Este estado armazena quantos gols o Time A marcou
  const [golsTimeA, setGolsTimeA] = useState(2);
  /*
  ┌─ golsTimeA: variável que sempre contém o número atual de gols do Time A
  ├─ setGolsTimeA: função para atualizar os gols do Time A
  └─ useState(2): Time A começa com 2 gols
  
   CICLO DO ESTADO:
  1. Valor inicial: golsTimeA = 2
  2. Quando setGolsTimeA(3) é chamado: golsTimeA passa a ser 3
  3. React re-renderiza o componente automaticamente
  4. A tela mostra o novo valor: 3
  */

  //  ESTADO 2: Gols do Time B  
  // Este estado armazena quantos gols o Time B marcou
  const [golsTimeB, setGolsTimeB] = useState(1);
  /*
  ┌─ golsTimeB: variável que sempre contém o número atual de gols do Time B
  ├─ setGolsTimeB: função para atualizar os gols do Time B
  └─ useState(1): Time B começa com 1 gol

  IMPORTANTE: Cada useState é INDEPENDENTE!
  - Alterar golsTimeA não afeta golsTimeB
  - Cada estado tem sua própria função "set"
  - React gerencia cada estado separadamente
  */

  /* 
  ═══════════════════════════════════════════════════════════════════════════════
   FUNÇÕES QUE MODIFICAM O ESTADO
  ═══════════════════════════════════════════════════════════════════════════════
  */

  //  FUNÇÃO: Marcar gol para o Time A
  const marcaGolTimeA = () => {
    /*
     PROCESSO DE ATUALIZAÇÃO:
    1. Função é chamada (quando botão é clicado)
    2. setGolsTimeA recebe o valor atual + 1
    3. React agenda uma re-renderização
    4. Na próxima renderização, golsTimeA terá o novo valor
    5. A interface é atualizada automaticamente
    
     ATENÇÃO: O estado NÃO muda imediatamente!
    - Se golsTimeA era 2, após setGolsTimeA(golsTimeA + 1)
    - golsTimeA ainda será 2 até a próxima renderização
    - Isso é chamado de "atualização assíncrona"
    */
    setGolsTimeA(golsTimeA + 1);
  }

  //  FUNÇÃO: Marcar gol para o Time B
  const marcaGolTimeB = () => {
    /*
     MESMO PROCESSO DO TIME A:
    - Pega o valor atual de golsTimeB
    - Adiciona 1
    - Agenda re-renderização
    - Interface atualiza automaticamente
    */
    setGolsTimeB(golsTimeB + 1);
  }

  //  FUNÇÃO: Resetar o placar
  const resetPlacar = () => {
    /*
     RESETANDO MÚLTIPLOS ESTADOS:
    - Chama setGolsTimeA(0) para zerar Time A
    - Chama setGolsTimeB(0) para zerar Time B
    - React agenda UMA re-renderização para ambas as mudanças
    - Isso é chamado de "batching" - agrupa atualizações
    
     ALTERNATIVA com useState funcional:
    setGolsTimeA(prev => 0);  // prev seria o valor anterior
    setGolsTimeB(prev => 0);  // útil quando novo valor depende do anterior
    */
    setGolsTimeA(0);
    setGolsTimeB(0);
  }

  /* 
  ═══════════════════════════════════════════════════════════════════════════════
   RENDERIZAÇÃO - COMO O ESTADO APARECE NA TELA
  ═══════════════════════════════════════════════════════════════════════════════
  */

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#2c3e50',
          marginBottom: '30px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
          fontWeight: 'bold'
        }}>
           Placar do Jogo
        </h1>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginBottom: '40px',
          gap: '20px'
        }}>
          {/* 
           EXIBINDO O ESTADO DO TIME A
          - {golsTimeA} mostra o valor atual do estado
          - Toda vez que setGolsTimeA é chamado, este valor muda
          - O estilo muda baseado na comparação dos estados (golsTimeA > golsTimeB)
          */}
          <div style={{
            flex: 1,
            padding: '20px',
            background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
            borderRadius: '15px',
            color: 'white',
            boxShadow: '0 8px 16px rgba(255, 107, 107, 0.3)',
            //  ESTILO DINÂMICO baseado no ESTADO:
            transform: golsTimeA > golsTimeB ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.3s ease'
          }}>
            <p style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              margin: '0 0 10px 0'
            }}>
              Time A
            </p>
            {/* 
             VALOR DO ESTADO SENDO EXIBIDO:
            - golsTimeA é renderizado diretamente
            - Automaticamente atualiza quando estado muda
            */}
            <p style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              margin: '0',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              {golsTimeA}
            </p>
          </div>

          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#7f8c8d',
            padding: '0 15px'
          }}>
            VS
          </div>

          {/* 
           EXIBINDO O ESTADO DO TIME B
          - Mesmo processo do Time A
          - Estado independente e gerenciado separadamente
          */}
          <div style={{
            flex: 1,
            padding: '20px',
            background: 'linear-gradient(135deg, #4ECDC4, #6EDDD6)',
            borderRadius: '15px',
            color: 'white',
            boxShadow: '0 8px 16px rgba(78, 205, 196, 0.3)',
            //  COMPARAÇÃO DE ESTADOS para estilo dinâmico:
            transform: golsTimeB > golsTimeA ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.3s ease'
          }}>
            <p style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              margin: '0 0 10px 0'
            }}>
              Time B
            </p>
            {/*  ESTADO golsTimeB sendo renderizado */}
            <p style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              margin: '0',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              {golsTimeB}
            </p>
          </div>
        </div>

        {/* 
        ═══════════════════════════════════════════════════════════════════════════
         BOTÕES QUE MODIFICAM O ESTADO
        ═══════════════════════════════════════════════════════════════════════════
        */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center'
          }}>
            {/* 
             BOTÃO QUE ATUALIZA ESTADO:
            - onClick={marcaGolTimeA} chama a função
            - Função executa setGolsTimeA(golsTimeA + 1)
            - React re-renderiza o componente
            - Novo valor aparece na tela
            */}
            <button 
              onClick={marcaGolTimeA} // ← TRIGGER para mudança de estado
              style={{
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '25px',
                background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E)',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)',
                transition: 'all 0.3s ease',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.4)';
              }}
            >
               Gol Time A
            </button>

            {/*  BOTÃO para Time B - mesmo processo */}
            <button 
              onClick={marcaGolTimeB} // ← TRIGGER para mudança de estado
              style={{
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '25px',
                background: 'linear-gradient(135deg, #4ECDC4, #6EDDD6)',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(78, 205, 196, 0.4)',
                transition: 'all 0.3s ease',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(78, 205, 196, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(78, 205, 196, 0.4)';
              }}
            >
               Gol Time B
            </button>
          </div>

          {/* 
           BOTÃO QUE RESETA AMBOS OS ESTADOS:
          - onClick={resetPlacar} chama função que modifica DOIS estados
          - setGolsTimeA(0) e setGolsTimeB(0) são chamados
          - React agrupa as atualizações em uma única re-renderização
          */}
          <button 
            onClick={resetPlacar} // ← TRIGGER para reset de múltiplos estados
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '25px',
              background: 'linear-gradient(135deg, #95a5a6, #bdc3c7)',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(149, 165, 166, 0.4)',
              transition: 'all 0.3s ease',
              alignSelf: 'center',
              minWidth: '150px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(149, 165, 166, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(149, 165, 166, 0.4)';
            }}
          >
             Reset
          </button>
        </div>
      </div>
    </div>
  )

  /* 
  ═══════════════════════════════════════════════════════════════════════════════
   RESUMO - CONCEITOS IMPORTANTES DO useState:
  ═══════════════════════════════════════════════════════════════════════════════
  
  1. DECLARAÇÃO: const [estado, setEstado] = useState(valorInicial)
  2. LEITURA: Use a variável 'estado' diretamente no JSX
  3. ESCRITA: Use 'setEstado(novoValor)' para atualizar
  4. RE-RENDERIZAÇÃO: React automaticamente re-renderiza quando estado muda
  5. IMUTABILIDADE: Nunca modifique o estado diretamente (estado = novoValor ❌)
  6. ASSÍNCRONO: Mudanças de estado não são imediatas
  7. INDEPENDÊNCIA: Cada useState é independente dos outros
  8. BATCHING: React pode agrupar múltiplas atualizações em uma re-renderização
  
  ═══════════════════════════════════════════════════════════════════════════════
  */
}

export default PlacarJogo;