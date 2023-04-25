import { Body, Controller, Get, Query, Post, Req } from '@nestjs/common'
import { AppService } from './app.service'
import { Decode2Dto, Encode2Dto } from '../encode2/encode2.dto'
import { Request } from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('encode')
  getEncode(): string {
    return this.appService.getEncode()
  }

  @Get('encode2')
  async getEncode2(@Req() req: Request): Promise<Object> {
    const thisUrl = req.url
    return await this.appService.getEncode2(thisUrl)
  }

  @Get('decode')
  getDecode(@Query('data') data: string): string {
    return this.appService.getDecode(data)
  }

  @Post('decode2')
  async postDecode2(@Req() req: Request, @Body() body: Decode2Dto): Promise<boolean> {
    return await this.appService.postDecode2(req.url, body)
  }
}
