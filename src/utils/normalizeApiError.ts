import type { AppError } from "@types";
import axios from "axios";

type ApiErrorResponse = {
  statusCode?: number;
  message?: string | string[];
  content?: unknown;
};

export function normalizeApiError(error: unknown): AppError {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const responseData = error.response?.data;
    const apiMessage = responseData?.message;

    if (Array.isArray(apiMessage) && apiMessage.length > 0) {
      return {
        message: apiMessage.join(", "),
        statusCode: responseData?.statusCode ?? error.response?.status,
      };
    }

    if (typeof apiMessage === "string" && apiMessage.trim()) {
      return {
        message: apiMessage,
        statusCode: responseData?.statusCode ?? error.response?.status,
      };
    }

    return {
      message: error.message || "Có lỗi xảy ra, vui lòng thử lại.",
      statusCode: responseData?.statusCode ?? error.response?.status,
    };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: "Có lỗi xảy ra, vui lòng thử lại." };
}
