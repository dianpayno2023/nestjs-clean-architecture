import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from '../dtos/author.dto';
import { AuthorInterface } from '../interfaces/author.interface';
import {
    AUTHOR_REPOSITORY,
    AuthorRepositoryInterface,
} from '../repositories/author.repository.interface';
import { GetAuthorsDto } from '../dtos';
import { GetAuthorsResult } from '../interfaces';

@Injectable()
export class AuthorService {
    constructor(
        @Inject(AUTHOR_REPOSITORY)
        private readonly repo: AuthorRepositoryInterface,
    ) { }

    async createAuthor(payload: CreateAuthorDto): Promise<AuthorInterface> {
        return this.repo.create(payload);
    }

    async getAuthorById(id: string): Promise<AuthorInterface | null> {
        const author = await this.repo.findById(id);

        console.log(author);
        if (!author) {
            throw new NotFoundException('Author not found');
        }
        return author;
    }

    async updateAuthor(id: string, payload: CreateAuthorDto): Promise<AuthorInterface | null> {
        const author = await this.repo.findById(id);
        if (!author) {
            throw new NotFoundException('Author not found');
        }
        return this.repo.update(id, payload);
    }

    async getAllAuthor(query: GetAuthorsDto): Promise<GetAuthorsResult> {
        return this.repo.findAll(query);
    }


    // async deleteAuthor(email: string): Promise<AuthorInterface | null> {
    //     return this.repo.findByEmail(email);
    // }
}

