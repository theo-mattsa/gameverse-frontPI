/**
 * @fileoverview Mock para o componente Image do Next.js (next/image).
 * 
 * Este arquivo substitui o componente Image otimizado do Next.js por um elemento <img> simples
 * durante os testes. Isso é necessário porque o componente Image real do Next.js depende de
 * funcionalidades do servidor que não estão disponíveis no ambiente de teste.
 * 
 * O mock preserva as props principais do componente original para que os testes possam
 * verificar se as imagens estão sendo renderizadas corretamente com os atributos esperados.
 */

import React from 'react';

/**
 * Interface que define as props do componente Image mockado
 * Inclui as principais props do componente Image do Next.js
 */
interface ImageProps {
  src: string; // URL da imagem (obrigatório)
  alt: string; // Texto alternativo para acessibilidade (obrigatório)
  width?: number | string; // Largura da imagem
  height?: number | string; // Altura da imagem
  fill?: boolean; // Se a imagem deve preencher o container pai
  priority?: boolean; // Se a imagem deve ser carregada com prioridade
  loading?: 'lazy' | 'eager'; // Estratégia de carregamento
  placeholder?: 'blur' | 'empty'; // Tipo de placeholder durante carregamento
  blurDataURL?: string; // URL da imagem blur para placeholder
  quality?: number; // Qualidade da imagem (1-100)
  sizes?: string; // Tamanhos responsivos da imagem
  style?: React.CSSProperties; // Estilos CSS inline
  className?: string; // Classes CSS
  onLoad?: () => void; // Callback quando a imagem carrega
  onError?: () => void; // Callback quando há erro no carregamento
  [key: string]: any; // Outras props que podem ser passadas
}

/**
 * Componente Image mockado que simula o comportamento do next/image
 * Renderiza um elemento <img> simples com as props principais preservadas
 */
const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  fill,
  className,
  style,
  onLoad,
  onError,
  priority,
  loading,
  quality,
  sizes,
  ...props
}) => {
  // Aplicar estilos específicos quando fill=true (simula o comportamento do Next.js)
  const fillStyles: React.CSSProperties = fill ? {
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    objectFit: 'cover',
    ...style
  } : style || {};

  return (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width} // Não definir width/height quando fill=true
      height={fill ? undefined : height}
      className={className}
      style={fillStyles}
      onLoad={onLoad}
      onError={onError}
      loading={loading}
      sizes={sizes}
      data-testid="next-image"
      data-priority={priority ? 'true' : 'false'} // Para testes verificarem prioridade
      data-quality={quality} // Para testes verificarem qualidade
      {...props}
    />
  );
};

export default Image;