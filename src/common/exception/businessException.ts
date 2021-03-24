import { HttpException } from '@nestjs/common';

export enum exceptionCode {
  paramError = 555,
}

export class BusinessException extends HttpException {
  constructor(response: string | Record<string, any>, status: exceptionCode) {
    super(response, status);
  }
}
