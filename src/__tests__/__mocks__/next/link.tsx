/**
 * @fileoverview Mock para o componente Link do Next.js (next/link).
 * 
 * Este arquivo substitui o componente Link otimizado do Next.js por um elemento <a> simples
 * durante os testes. Isso é necessário porque o componente Link real do Next.js depende de
 * funcionalidades do roteador que não estão disponíveis no ambiente de teste.
 * 
 * O mock preserva as props principais do componente original para que os testes possam
 * verificar se os links estão sendo renderizados corretamente com os atributos esperados.
 */

import React from 'react';

/**
 * Interface que define as props do componente Link mockado
 * Inclui as principais props do componente Link do Next.js
 */
interface LinkProps {
  href: string; // URL de destino (obrigatório)
  children: React.ReactNode; // Conteúdo do link (obrigatório)
  className?: string; // Classes CSS
  style?: React.CSSProperties; // Estilos CSS inline
  target?: string; // Target do link (_blank, _self, etc.)
  rel?: string; // Atributo rel para segurança
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; // Handler de click
  onMouseEnter?: () => void; // Handler de mouse enter
  onMouseLeave?: () => void; // Handler de mouse leave
  prefetch?: boolean; // Se deve fazer prefetch da página
  replace?: boolean; // Se deve substituir a entrada no histórico
  scroll?: boolean; // Se deve fazer scroll para o topo
  shallow?: boolean; // Se deve fazer navegação shallow
  passHref?: boolean; // Se deve passar href para o child
  legacyBehavior?: boolean; // Comportamento legado
  [key: string]: any; // Outras props que podem ser passadas
}

/**
 * Componente Link mockado que simula o comportamento do next/link
 * Renderiza um elemento <a> simples com as props principais preservadas
 */
const Link: React.FC<LinkProps> = ({
  href,
  children,
  className,
  style,
  target,
  rel,
  onClick,
  onMouseEnter,
  onMouseLeave,
  prefetch,
  replace,
  scroll,
  shallow,
  ...props
}) => {
  return (
    <a
      href={href}
      className={className}
      style={style}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-testid="next-link"
      data-prefetch={prefetch ? 'true' : 'false'} // Para testes verificarem prefetch
      data-replace={replace ? 'true' : 'false'} // Para testes verificarem replace
      data-scroll={scroll ? 'true' : 'false'} // Para testes verificarem scroll
      data-shallow={shallow ? 'true' : 'false'} // Para testes verificarem shallow
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;