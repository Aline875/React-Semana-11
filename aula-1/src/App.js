// 1. IMPORTAÇÕES
// useState: Hook que permite adicionar estado a componentes funcionais
import { useState } from 'react';

// 2. DEFINIÇÃO DO COMPONENTE
// export default: permite que este componente seja importado em outros arquivos
// function Contador(): define um componente funcional chamado Contador
export default function Contador() {
  
  // 3. HOOK useState
  // useState(0): cria uma variável de estado iniciando com valor 0
  // [numero, setNumero]: desestruturação do array retornado pelo useState
  // - numero: variável que contém o valor atual do estado
  // - setNumero: função para atualizar o valor do estado
  const [numero, setNumero] = useState(0);
  
  // 4. RENDERIZAÇÃO (JSX)
  // return: retorna o JSX que será renderizado na tela
  return (
    <div style={styles.container}>
      {/* 5. EXIBIÇÃO DO VALOR */}
      {/* {numero}: interpolação JavaScript - mostra o valor atual da variável */}
      <p style={styles.texto}>Contador: {numero}</p>
      
      {/* 6. BOTÃO DE INCREMENTO */}
      {/* onClick: evento que dispara quando o botão é clicado */}
      {/* () => setNumero(numero + 1): arrow function que incrementa o contador */}
      <button 
        style={styles.botao}
        onClick={() => setNumero(numero + 1)}
      >
        ✨ Incrementar
      </button>
      
      {/* BOTÃO ADICIONAL: Decrementar */}
      <button 
        style={styles.botaoDecrementar}
        onClick={() => setNumero(numero - 1)}
      >
        ⬇️ Decrementar
      </button>
      
      {/* BOTÃO ADICIONAL: Reset */}
      <button 
        style={styles.botaoReset}
        onClick={() => setNumero(0)}
      >
        🔄 Reset
      </button>
    </div>
  );
}

// 7. ESTILOS CSS-IN-JS
// Objeto contendo todos os estilos do componente
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f8ff',
    borderRadius: '15px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '50px auto',
    border: '2px solid #e6f3ff'
  },
  
  texto: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '30px',
    textAlign: 'center',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)'
  },
  
  botao: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '25px',
    cursor: 'pointer',
    margin: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
    minWidth: '140px'
  },
  
  botaoDecrementar: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '25px',
    cursor: 'pointer',
    margin: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)',
    minWidth: '140px'
  },
  
  botaoReset: {
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '25px',
    cursor: 'pointer',
    margin: '8px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(149, 165, 166, 0.3)',
    minWidth: '140px'
  }
};

/* 
CONCEITOS IMPORTANTES EXPLICADOS:

1. COMPONENTE FUNCIONAL:
   - Função JavaScript que retorna JSX
   - Mais simples que componentes de classe
   - Usa Hooks para gerenciar estado

2. HOOK useState:
   - Permite adicionar estado a componentes funcionais
   - Retorna um array com [valor, função_para_alterar_valor]
   - Quando o estado muda, o componente re-renderiza

3. JSX:
   - Sintaxe que mistura HTML com JavaScript
   - Permite usar {} para executar código JavaScript
   - Deve retornar um único elemento pai

4. EVENTO onClick:
   - Propriedade que define o que acontece no clique
   - Recebe uma função como valor
   - Arrow functions são comuns: () => código

5. RE-RENDERIZAÇÃO:
   - Quando setNumero() é chamado, o React re-renderiza o componente
   - O novo valor aparece automaticamente na tela
   - Isso é o que torna o React "reativo"
*/