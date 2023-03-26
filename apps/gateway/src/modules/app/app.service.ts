import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public test(): { message: string } {
    return { message: 'Welcome to gateway!' };
  }
}
