import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
    BOOK_REPOSITORY,
    BookRepositoryInterface,
} from '../repositories/book.repository.interface';
import { CreateBookDto, GetQueryParamBookDto } from '../dtos';
import { BookInterface, GetBooksResult } from '../interfaces';


@Injectable()
export class BookService {
    constructor(
        @Inject(BOOK_REPOSITORY)
        private readonly repo: BookRepositoryInterface,
    ) { }

    async createBook(payload: CreateBookDto): Promise<BookInterface> {
        return this.repo.create(payload);
    }
    async getAuthorById(id: string): Promise<BookInterface | null> {
        const book = await this.repo.findById(id);
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }
    async updateBook(id: string, payload: CreateBookDto): Promise<BookInterface | null> {
        const book = await this.repo.findById(id);
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return this.repo.update(id, payload);
    }

    async getAllBook(query: GetQueryParamBookDto): Promise<GetBooksResult> {
        return this.repo.findAll(query);
    }

    async deleteBook(id: string): Promise<BookInterface | null> {
        return this.repo.delete(id);
    }
}

