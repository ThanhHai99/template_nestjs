import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { AppService } from './app.service'
import { AppInterceptor } from 'src/shared/interceptor/app.interceptor'

@Controller('app')
@UseInterceptors(new AppInterceptor())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): boolean {
    return this.appService.getHello()
  }
}
