import { HttpCode, Injectable } from '@nestjs/common';
import { stat } from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getTest(): string {
    return {
      statusCode: 201,
      message: 'Hello World!'} as unknown as string;
  }
}
