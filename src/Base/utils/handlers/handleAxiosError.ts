import { isAxiosError } from "axios";

interface BaseError {
  message: string;
  statusCode: number;
}

export default function handleAxiosError(error: unknown): string {
  if (isAxiosError<BaseError>(error)) {
    return error.response?.data.message
      ? error.response?.data.message
      : error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Error inesperado, intente nuevamente mas tarde";
}
