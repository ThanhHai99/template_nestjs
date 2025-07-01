import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { User } from './user.entity'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get('seed')
  seed() {
    return this.userService.seedUsingWorkers()
  }

  @Get()
  async findAll(@Query() query: { keyword: string }): Promise<Array<User>> {
    return await this.userService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
