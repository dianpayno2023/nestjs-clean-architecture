import { Module } from '@nestjs/common';
import { PostgresService } from '../../infrastructure/database/postgres.service';
import { BookController } from './controller/book.controlller';
import { BookService } from './services/book.service';
import { BookPostgresRepository } from './infrastructure/book.repository';
import { BOOK_REPOSITORY } from './repositories/book.repository.interface';


@Module({
    controllers: [BookController],
    providers: [
        PostgresService,
        BookService,
        BookPostgresRepository,
        {
            provide: BOOK_REPOSITORY,
            useExisting: BookPostgresRepository,
        },
    ],
    exports: [BOOK_REPOSITORY],
})
export class AuthorModule { }

