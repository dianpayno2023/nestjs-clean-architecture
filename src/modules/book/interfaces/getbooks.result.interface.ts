import { MetaResponse } from "src/common/interfaces/api-response.interface";
import { BookInterface } from "./book.interface";

export interface GetBooksResult {
    items: BookInterface[];
    meta: MetaResponse;
}

export interface CountRow {
    total: string;
}

export type QueryParam = string | number | boolean | Date | null;
