import { useEffect, useState } from "react";

/**
 * Hook que aplica um efeito debounce a um valor. 
 * Ele retorna o valor apos um intervalo de tempo (delay) da ultima alteração
 * @param value O valor que será atrasado
 * @param delay Tempo de espera antes de atualizar o valor
 * @returns  O valor atrasado que é atualizado após o delay
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
