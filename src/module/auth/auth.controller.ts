import { Controller, Post, Body, Req, Res, UseGuards, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
import { BodyLogin, BodyRegister } from './auth.dto'
import { Request, Response } from 'express'
import { LocalAuthGuard } from './guards/local.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: BodyLogin): Promise<any> {
    return this.authService.login(body)
  }

  @Post('register')
  async register(@Body() body: BodyRegister, @Res() res: Response, @Req() req: Request): Promise<any> {
    await this.authService.register(body)

    return res.status(HttpStatus.CREATED).json({
      error: 0,
      message: 'Sign up successfully',
    })
  }
}
