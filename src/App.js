import { useState, useEffect } from 'react'

export default function ContadorAutomatico() {
  /* 
  ═══════════════════════════════════════════════════════════════════════════════
   ENTENDENDO O useEffect - EFEITOS COLATERAIS EM REACT
  ═══════════════════════════════════════════════════════════════════════════════
  
  O useEffect é um HOOK que permite executar "efeitos colaterais" em componentes funcionais.
  Efeitos colaterais são operações que afetam algo fora do componente:
  - Requisições HTTP
  - Timers (setInterval, setTimeout)
  - Subscrições (WebSocket, eventos)
  - Manipulação direta do DOM
  - Logging, analytics
  
  SINTAXE: useEffect(função, [dependências])
  - função: código a ser executado
  - dependências: array que controla quando o efeito executa
  */

  //  ESTADO: Valor do contador (useState para gerenciar o número)
  const [contador, setContador] = useState(0);
  
  //  ESTADO: Controla se o contador está ativo ou pausado
  const [isActive, setIsActive] = useState(true);

  /* 
  ═══════════════════════════════════════════════════════════════════════════════
   useEffect PRINCIPAL - GERENCIANDO O TIMER
  ═══════════════════════════════════════════════════════════════════════════════
  */
  useEffect(() => {
    /*
     EFEITO COLATERAL: Criar/Gerenciar um setInterval
    
    Este useEffect é responsável por:
    1. Criar um timer que executa a cada 1 segundo
    2. Incrementar o contador automaticamente
    3. Limpar o timer quando necessário
    */
    
    let intervalo;
    
    /*
     LÓGICA CONDICIONAL dentro do useEffect:
    - Se isActive = true: cria o timer
    - Se isActive = false: não cria timer (contador pausado)
    */
    if (isActive) {
      /*
       CRIANDO O TIMER:
      setInterval executa uma função repetidamente a cada X milissegundos
      - Função: () => setContador(prev => prev + 1)
      - Intervalo: 1000ms = 1 segundo
      
       IMPORTANTE: Usamos setContador(prev => prev + 1) ao invés de setContador(contador + 1)
      Motivo: Closure - dentro do setInterval, 'contador' sempre será o valor inicial
      Com 'prev => prev + 1', React passa o valor atual como parâmetro
      */
      intervalo = setInterval(() => {
        setContador(prev => {
          /*
           PROCESSO DE ATUALIZAÇÃO:
          1. setInterval executa esta função a cada 1 segundo
          2. React chama esta função passando o valor atual como 'prev'
          3. Retornamos prev + 1 (valor atual + 1)
          4. React atualiza o estado e re-renderiza o componente
          5. Novo valor aparece na tela
          */
          return prev + 1;
        });
      }, 1000);
    }
    
    /*
     FUNÇÃO DE LIMPEZA (CLEANUP):
    O return dentro do useEffect é uma função de limpeza que executa:
    1. Antes do componente ser removido da tela (unmount)
    2. Antes do useEffect executar novamente (quando dependências mudam)
    
    CRÍTICO: Sempre limpe timers!
    Se não limparmos, o timer continuará executando mesmo após o componente
    ser removido, causando vazamentos de memória e erros.
    */
    return () => {
      if (intervalo) {
        clearInterval(intervalo);
        /*
         QUANDO A LIMPEZA EXECUTA:
        - Quando isActive muda de true para false
        - Quando isActive muda de false para true  
        - Quando o componente é desmontado
        - Antes de criar um novo timer
        */
      }
    };
    
  }, [isActive]); 
  /*
   ARRAY DE DEPENDÊNCIAS: [isActive]
  
  Este array controla QUANDO o useEffect executa:
  - [] (vazio): executa apenas uma vez após o primeiro render
  - [isActive]: executa quando isActive muda
  - [var1, var2]: executa quando var1 OU var2 mudam
  - sem array: executa após CADA render (cuidado!)
  
   CICLO DE EXECUÇÃO neste caso:
  1. Componente renderiza pela primeira vez
  2. useEffect executa (isActive = true, cria timer)
  3. Usuário clica "Pausar" (isActive = false)
  4. useEffect executa novamente:
     - Primeiro: função de limpeza (clearInterval)
     - Depois: função principal (não cria timer pois isActive = false)
  5. Usuário clica "Iniciar" (isActive = true)
  6. useEffect executa novamente:
     - Primeiro: função de limpeza (sem timer para limpar)
     - Depois: função principal (cria novo timer)
  */

  /* 
  ═══════════════════════════════════════════════════════════════════════════════
   FUNÇÕES DE CONTROLE (modificam estados que afetam o useEffect)
  ═══════════════════════════════════════════════════════════════════════════════
  */

  //  FUNÇÃO: Pausar/Iniciar contador
  const toggleCounter = () => {
    /*
     PROCESSO:
    1. setIsActive(!isActive) muda o estado
    2. Como isActive está no array de dependências do useEffect
    3. useEffect executa novamente
    4. Se era true→false: timer é limpo, contador para
    5. Se era false→true: novo timer é criado, contador reinicia
    */
    setIsActive(!isActive);
  };

  //  FUNÇÃO: Resetar contador
  const resetCounter = () => {
    /*
     RESETANDO APENAS O VALOR:
    - Esta função só altera o valor do contador
    - NÃO afeta o isActive, então useEffect não executa
    - Timer continua rodando (se estava ativo)
    - Próxima execução do timer pegará o valor 0 e incrementará
    */
    setContador(0);
  };

  /* 
  ═══════════════════════════════════════════════════════════════════════════════
   RENDERIZAÇÃO - INTERFACE DO USUÁRIO
  ═══════════════════════════════════════════════════════════════════════════════
  */

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
          }
          
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0.3; }
          }
        `}
      </style>
      
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
          borderRadius: '30px',
          padding: '60px 40px',
          textAlign: 'center',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          maxWidth: '400px',
          width: '100%'
        }}>
          
          <h1 style={{
            fontSize: '2rem',
            color: '#2c3e50',
            marginBottom: '40px',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
             Contador Automático
          </h1>

          {/* 
           DISPLAY DO CONTADOR:
          - {contador} mostra o valor atual
          - Valor é atualizado automaticamente pelo useEffect
          - Estilo muda baseado no estado isActive
          */}
          <div style={{
            background: `linear-gradient(135deg, ${isActive ? '#4CAF50, #66BB6A' : '#FF9800, #FFB74D'})`,
            borderRadius: '20px',
            padding: '40px 20px',
            marginBottom: '30px',
            boxShadow: `0 10px 30px ${isActive ? 'rgba(76, 175, 80, 0.3)' : 'rgba(255, 152, 0, 0.3)'}`,
            //  ESTILO DINÂMICO baseado no estado isActive:
            transform: isActive ? 'scale(1.02)' : 'scale(1)',
            transition: 'all 0.5s ease',
            position: 'relative',
            overflow: 'hidden'
          }}>
            
            {/* 
             ANIMAÇÃO VISUAL (só aparece quando ativo):
            - Renderização condicional baseada em isActive
            - Mostra que o useEffect está executando
            */}
            {isActive && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%) scale(0)',
                animation: 'pulse 1s infinite',
                zIndex: 0
              }}></div>
            )}

            {/* 
            VALOR DO CONTADOR:
            - {contador} é atualizado pelo useEffect
            - Formatado com padStart para sempre ter 3 dígitos
            */}
            <div style={{
              fontSize: '4rem',
              fontWeight: 'bold',
              color: 'white',
              textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              zIndex: 1,
              fontFamily: 'monospace'
            }}>
              {contador.toString().padStart(3, '0')}
            </div>
            
            {/* 
            📱 STATUS VISUAL:
            - Texto muda baseado no estado isActive
            - Mostra se o useEffect está executando o timer
            */}
            <div style={{
              fontSize: '1.2rem',
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: '500',
              marginTop: '10px',
              position: 'relative',
              zIndex: 1
            }}>
              {isActive ? ' Contando...' : '⏸ Pausado'}
            </div>
          </div>

          {/* 
           INDICADOR DE STATUS:
          - Cor e animação mudam baseado em isActive
          - Feedback visual do estado que controla o useEffect
          */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '30px',
            gap: '10px'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: isActive ? '#4CAF50' : '#FF9800',
              boxShadow: `0 0 20px ${isActive ? '#4CAF50' : '#FF9800'}`,
              //  ANIMAÇÃO condicional baseada no estado:
              animation: isActive ? 'blink 1s infinite' : 'none'
            }}></div>
            <span style={{
              color: '#555',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              Status: {isActive ? 'Ativo' : 'Pausado'}
            </span>
          </div>

          {/* 
          ═══════════════════════════════════════════════════════════════════════════
           CONTROLES QUE AFETAM O useEffect
          ═══════════════════════════════════════════════════════════════════════════
          */}
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {/* 
             BOTÃO PAUSAR/INICIAR:
            - onClick={toggleCounter} muda isActive
            - Mudança em isActive dispara useEffect
            - useEffect cria/remove timer baseado no novo valor
            */}
            <button
              onClick={toggleCounter} // ← TRIGGER que afeta useEffect
              style={{
                padding: '15px 25px',
                fontSize: '1rem',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '25px',
                //  ESTILO DINÂMICO baseado no estado:
                background: isActive 
                  ? 'linear-gradient(135deg, #FF5722, #FF7043)' 
                  : 'linear-gradient(135deg, #4CAF50, #66BB6A)',
                color: 'white',
                cursor: 'pointer',
                boxShadow: isActive 
                  ? '0 6px 20px rgba(255, 87, 34, 0.4)' 
                  : '0 6px 20px rgba(76, 175, 80, 0.4)',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                minWidth: '120px'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = isActive 
                  ? '0 8px 25px rgba(255, 87, 34, 0.5)' 
                  : '0 8px 25px rgba(76, 175, 80, 0.5)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = isActive 
                  ? '0 6px 20px rgba(255, 87, 34, 0.4)' 
                  : '0 6px 20px rgba(76, 175, 80, 0.4)';
              }}
            >
              {isActive ? '⏸️ Pausar' : '▶️ Iniciar'}
            </button>

            {/* 
             BOTÃO RESET:
            - onClick={resetCounter} muda apenas o valor
            - NÃO afeta isActive, então useEffect não executa
            - Timer continua rodando se estava ativo
            */}
            <button
              onClick={resetCounter} // ← NÃO afeta useEffect diretamente
              style={{
                padding: '15px 25px',
                fontSize: '1rem',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '25px',
                background: 'linear-gradient(135deg, #607D8B, #78909C)',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(96, 125, 139, 0.4)',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)',
                minWidth: '120px'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(96, 125, 139, 0.5)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 6px 20px rgba(96, 125, 139, 0.4)';
              }}
            >
               Reset
            </button>
          </div>

          {/* 
          ═══════════════════════════════════════════════════════════════════════════
           EXPLICAÇÃO 
          ═══════════════════════════════════════════════════════════════════════════
          */}
          <div style={{
            marginTop: '40px',
            padding: '20px',
            background: 'rgba(52, 152, 219, 0.1)',
            borderRadius: '15px',
            border: '1px solid rgba(52, 152, 219, 0.2)',
            textAlign: 'left'
          }}>
            <h3 style={{
              color: '#2c3e50',
              fontSize: '1.1rem',
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              🎓 Como funciona o useEffect aqui:
            </h3>
            
            <div style={{
              fontSize: '0.9rem',
              color: '#555',
              lineHeight: '1.6'
            }}>
              <p><strong>1. Dependência:</strong> <code>[isActive]</code> - executa quando muda</p>
              <p><strong>2. Timer:</strong> <code>setInterval</code> incrementa contador a cada 1s</p>
              <p><strong>3. Limpeza:</strong> <code>clearInterval</code> remove timer antigo</p>
              <p><strong>4. Closure:</strong> <code>prev => prev + 1</code> evita valor desatualizado</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}