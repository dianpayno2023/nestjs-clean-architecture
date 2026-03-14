import { Module } from '@nestjs/common';
import { PostgresService } from '../../infrastructure/database/postgres.service';
import { AuthorController } from './controller/author.controller';
import { AuthorPostgresRepository } from './infrastructure/author.repository';
import { AUTHOR_REPOSITORY } from './repositories/author.repository.interface';
import { AuthorService } from './services/author.service';

@Module({
    controllers: [AuthorController],
    providers: [
        PostgresService,
        AuthorService,
        AuthorPostgresRepository,
        {
            provide: AUTHOR_REPOSITORY,
            useExisting: AuthorPostgresRepository,
        },
    ],
    exports: [AUTHOR_REPOSITORY],
})
export class AuthorModule { }
