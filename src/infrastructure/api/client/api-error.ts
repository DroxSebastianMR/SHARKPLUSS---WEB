import axios from 'axios';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

export function getApiErrorMessage(error: unknown, fallback: string) {
  return error instanceof ApiError || axios.isAxiosError(error) ? error.message || fallback : fallback;
}
