import { AxiosError } from "axios";
import { ApiError } from "../api/types";

export function handleApiError(error: unknown): string {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiError;
    // Erro de validação com campos específicos
    if (apiError?.errors) {
      return Object.values(apiError.errors).flat().join(", ");
    }
    // Erro com mensagem específica
    if (apiError?.message) {
      return apiError.message;
    }
    // HTTP error status
    switch (error.response?.status) {
      case 400:
        return "Requisição inválida";
      case 401:
        return "Não autorizado";
      case 403:
        return "Acesso proibido";
      case 404:
        return "Recurso não encontrado";
      case 500:
        return "Erro interno do servidor";
      default:
        return `Erro desconhecido: ${error.response?.status}`;
    }
  }
  // Erro de rede
  if (error instanceof Error) {
    return error.message;
  }
  return "Ocorreu um erro desconhecido";
}
