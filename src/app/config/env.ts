const apiUrl = import.meta.env.VITE_API_BASE_URL;

if (!apiUrl) {
  throw new Error('VITE_API_BASE_URL no está configurada. Crea un archivo .env a partir de .env.example.');
}

export const env = {
  API_URL: apiUrl,
} as const;
