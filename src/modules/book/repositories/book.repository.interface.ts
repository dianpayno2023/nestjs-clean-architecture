import { CreateBookDto, GetQueryParamBookDto } from '../dtos';
import { BookInterface, GetBooksResult } from '../interfaces';
export const BOOK_REPOSITORY = 'BOOK_REPOSITORY';

export interface BookRepositoryInterface {
    create(payload: CreateBookDto): Promise<BookInterface>;
    findById(id: string): Promise<BookInterface | null>;
    update(id: string, payload: CreateBookDto): Promise<BookInterface | null>;
    findAll(query: GetQueryParamBookDto): Promise<GetBooksResult>;
    delete(id:string):Promise<BookInterface|null> 
}

