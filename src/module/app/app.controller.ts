import { Controller, Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/test_redis')
  async testRedis(@Req() req: Request, @Res() res: Response): Promise<any> {
    const apiKey = req.header('api_key')
    const dataFinal = await this.appService.testRedis(apiKey)
    return res.status(200).json(dataFinal)
  }
}
