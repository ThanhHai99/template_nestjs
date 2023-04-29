import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { AppService } from './app.service'
import { AppInterceptor } from './app.interceptor'

@Controller('app')
@UseInterceptors(new AppInterceptor())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): boolean {
    return this.appService.getHello()
  }

  // /**
  //  * For Server
  //  * @param req
  //  * @param body
  //  * @returns
  //  */
  // @Post('decode-request')
  // decodeRequest(@Req() req: Request, @Body() body: Decode2Dto): boolean {
  //   return this.appService.decodeRequest(req.url, body)
  // }
}
