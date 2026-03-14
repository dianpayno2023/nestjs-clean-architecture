import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly svc: UserService) { }

  @Post()
  async create(@Body() payload: CreateUserDto): Promise<User> {
    return this.svc.createUser(payload);
  }

  @Get()
  async findByEmail(@Body() email: string): Promise<User | null> {
    return this.svc.getUsers(email);
  }
}

