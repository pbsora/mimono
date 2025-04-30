import { HttpStatus } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

interface TMDBErrorResponse {
  status_message: string;
  status_code: number;
}

// interface ErrorResponse {
//   statusCode: number;
//   message: string;
//   error: string;
// }

export class ApiException {
  static handle(error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<TMDBErrorResponse>;
      const status = axiosError.response?.status;
      const message =
        axiosError.response?.data?.status_message ||
        axiosError.message ||
        'An error occurred while fetching data';

      switch (status) {
        case HttpStatus.BAD_REQUEST:
          return {
            statusCode: status,
            message,
          };

        case HttpStatus.UNAUTHORIZED:
          return {
            statusCode: status,
            message: 'Invalid API key or unauthorized access',
          };

        case HttpStatus.NOT_FOUND:
          return {
            statusCode: status,
            message: 'The requested movie was not found',
          };

        case HttpStatus.TOO_MANY_REQUESTS:
          return {
            statusCode: status,
            message: 'Rate limit exceeded. Please try again later',
          };

        default:
          return {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'An unexpected error occurred',
          };
      }
    } else {
      const errorObj = error as {
        status: number | undefined;
        message: string;
      };
      const { status, message } = errorObj;

      switch (status) {
        case HttpStatus.CONFLICT:
          return {
            statusCode: HttpStatus.CONFLICT,
            message,
          };
        case HttpStatus.BAD_REQUEST:
          return {
            statusCode: status,
            message,
          };

        case HttpStatus.UNAUTHORIZED:
          return {
            statusCode: status,
            message: 'Invalid API key or unauthorized access',
          };

        case HttpStatus.NOT_FOUND:
          return {
            statusCode: status,
            message: 'The requested movie was not found',
          };

        case HttpStatus.TOO_MANY_REQUESTS:
          return {
            statusCode: status,
            message: 'Rate limit exceeded. Please try again later',
          };

        default:
          return {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'An unexpected error occurred',
          };
      }
    }
  }
}
