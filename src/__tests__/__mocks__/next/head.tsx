/**
 * @fileoverview Mock para o componente Head do Next.js (next/head).
 * 
 * Este arquivo substitui o componente Head do Next.js que é usado para modificar
 * o <head> do documento HTML. Durante os testes, não precisamos realmente modificar
 * o head do documento, então este mock simplesmente renderiza os children em um
 * div para que possam ser testados.
 * 
 * Útil para testar componentes que definem títulos de página, meta tags, etc.
 */

import React from 'react';

/**
 * Interface que define as props do componente Head mockado
 */
interface HeadProps {
  children: React.ReactNode; // Elementos que seriam inseridos no <head>
}

/**
 * Componente Head mockado que simula o comportamento do next/head
 * Renderiza os children em um div com data-testid para facilitar os testes
 */
const Head: React.FC<HeadProps> = ({ children }) => {
  return (
    <div data-testid="next-head">
      {children}
    </div>
  );
};

export default Head;