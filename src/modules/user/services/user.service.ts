import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../interfaces/user.interface';
import {
  USER_REPOSITORY,
  UserRepositoryInterface,
} from '../repositories/user.repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async createUser(payload: CreateUserDto): Promise<User> {
    return this.userRepository.create(payload);
  }

  async getUsers(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}

