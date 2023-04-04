import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { AppService } from './app.service'
import { TestInterceptor } from 'src/interceptor-test/interceptor-test.interceptor'

@Controller()
@UseInterceptors(new TestInterceptor())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
