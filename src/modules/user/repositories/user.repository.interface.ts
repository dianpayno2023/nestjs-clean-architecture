import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../interfaces/user.interface';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepositoryInterface {
  create(payload: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
}

