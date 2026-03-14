import { Module } from '@nestjs/common';
import { PostgresService } from '../../infrastructure/database/postgres.service';
import { UserController } from './controllers/user.controller';
import { UserPostgresRepository } from './infrastructure/postgres/user.repository';
import { USER_REPOSITORY } from './repositories/user.repository.interface';
import { UserService } from './services/user.service';

@Module({
  controllers: [UserController],
  providers: [
    PostgresService,
    UserService,
    UserPostgresRepository,
    {
      provide: USER_REPOSITORY,
      useExisting: UserPostgresRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
