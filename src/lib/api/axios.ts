import axios from "axios";
import { tokenManager } from "../auth/token-manager";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptador para adicionar o token de autenticação automaticamente
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptador para lidar com erros de autenticação (token expirado)
api.interceptors.response.use(
  (response) => response, // Simplesmente retorna a resposta se for bem-sucedida
  (error) => {
    if (error.response && error.response.status === 401) {
      tokenManager.removeToken();
      // Evita o redirecionamento em loop se já estivermos na página de login
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
