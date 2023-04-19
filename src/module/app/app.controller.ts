import { Controller, Get, Post, Query } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public async getHello(@Query('idx') idx: string, @Query('id') id: string) {
    return await this.appService.getData(idx, id)
  }

  @Post()
  public async setData() {
    return await this.appService.setData()
  }
}
