import { CreateAuthorDto, GetAuthorsDto } from '../dtos';
import { AuthorInterface, GetAuthorsResult } from '../interfaces';
export const AUTHOR_REPOSITORY = 'AUTHOR_REPOSITORY';

export interface AuthorRepositoryInterface {
    create(payload: CreateAuthorDto): Promise<AuthorInterface>;
    findById(id: string): Promise<AuthorInterface | null>;
    update(id: string, payload: CreateAuthorDto): Promise<AuthorInterface | null>;
    findAll(query: GetAuthorsDto): Promise<GetAuthorsResult>;
}

