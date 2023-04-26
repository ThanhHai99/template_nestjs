import { Body, Controller, Get, Query, Post, Req, UseInterceptors } from '@nestjs/common'
import { AppService } from './app.service'
import { Decode2Dto } from '../encode2/encode2.dto'
import { Request } from 'express'
import { AppInterceptor } from './app.interceptor'

@Controller()
@UseInterceptors(new AppInterceptor())
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * For Client
   * @param req
   * @returns
   */
  @Get('encode-request')
  encodeRequest(@Req() req: Request): Object {
    const thisUrl = req.url
    return this.appService.encodeRequest(thisUrl)
  }

  /**
   * For Server
   * @param req
   * @param body
   * @returns
   */
  @Post('decode-request')
  decodeRequest(@Req() req: Request, @Body() body: Decode2Dto): boolean {
    return this.appService.decodeRequest(req.url, body)
  }

  /**
   * For Server
   * @returns
   */
  @Get('encode-response')
  encodeResponse(): string {
    return this.appService.encodeResponse()
  }

  /**
   * For Client
   * @param data
   * @returns
   */
  @Get('decode-response')
  decodeResponse(@Query('data') data: string): string {
    return this.appService.decodeResponse(data)
  }
}
