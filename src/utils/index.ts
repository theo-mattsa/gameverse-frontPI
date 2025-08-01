/**
 * Converte um objeto `File` para uma string codificada em Base64.
 *
 * @param file - O arquivo a ser convertido.
 * @returns Uma promise que resolve para a representação em string Base64 do arquivo,
 *          ou `null` se a conversão falhar.
 */
export function fileToBase64(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      if (typeof base64 === "string") {
        resolve(base64);
      } else {
        resolve(null);
      }
    };
    reader.readAsDataURL(file);
  });
}
