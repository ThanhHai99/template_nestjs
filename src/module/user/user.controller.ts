import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
