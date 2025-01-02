import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(message: string, status: number = HttpStatus.BAD_REQUEST) {
    super({ statusCode: status, message }, status);
  }
}