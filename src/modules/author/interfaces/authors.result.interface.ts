
import { AuthorInterface } from './author.interface';
import { MetaResponse } from 'src/common/interfaces/api-response.interface';

export interface GetAuthorsResult {
    items: AuthorInterface[];
    meta: MetaResponse;
}

export interface CountRow {
    total: string;
}

export type QueryParam = string | number | boolean | Date | null;
