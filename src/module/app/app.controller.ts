import { Controller, Get, Query } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('encode')
  getEncode(): string {
    return this.appService.getEncode()
  }

  @Get('decode')
  getDecode(@Query('data') data: string): string {
    return this.appService.getDecode(data)
  }
}
