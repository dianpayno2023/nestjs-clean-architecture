import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseError } from 'pg';
import { PostgresService } from '../../../infrastructure/database/postgres.service';
import { CreateAuthorDto, GetAuthorsDto } from '../dtos';
import { AuthorInterface, CountRow, QueryParam, GetAuthorsResult } from '../interfaces';
import { AuthorRepositoryInterface } from '../repositories/author.repository.interface';
import { authorQueries } from './author.queries';
import { MetaResponse } from 'src/common/interfaces/api-response.interface';



@Injectable()
export class AuthorPostgresRepository implements AuthorRepositoryInterface {
    constructor(private readonly pool: PostgresService) { }

    async create(payload: CreateAuthorDto): Promise<AuthorInterface> {
        try {
            const result = await this.pool.query<AuthorInterface>(authorQueries.create, [
                payload.name,
                payload.bio ?? null
            ]);

            return this.toDomain(result.rows[0]);
        } catch (error) {
            if (error instanceof DatabaseError && error.code === '23505') {
                throw new ConflictException('Author already exists');
            }

            throw error;
        }
    }

    async update(id: string, payload: CreateAuthorDto): Promise<AuthorInterface | null> {
        try {
            const result = await this.pool.query<AuthorInterface>(authorQueries.update, [
                payload.name,
                payload.bio ?? null,
                id
            ]);
            if (!result.rows.length) {
                return null;
            } else {
                return this.toDomain(result.rows[0]);
            }
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string): Promise<AuthorInterface | null> {
        try {

            const result = await this.pool.query<AuthorInterface>(
                authorQueries.delete,
                [id]
            );

            if (!result.rows.length) {
                return null;
            }

            return this.toDomain(result.rows[0]);

        } catch (error) {
            throw error;
        }
    }

    async findById(id: string): Promise<AuthorInterface | null> {
        try {
            const result = await this.pool.query<AuthorInterface>(authorQueries.findById, [id]);
            if (!result.rows.length) {
                return null;
            } else {

                // console.log(result.rows)
                return this.toDomainById(result.rows);
            }

        } catch (error) {
            throw error;
        }
    }

    async findAll(query: GetAuthorsDto): Promise<GetAuthorsResult> {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const offset = (page - 1) * limit;
        const { whereClause, params } = this.buildWhereClause(query);

        const dataQuery = `
    ${authorQueries.baseSelect}
    ${whereClause}
    ${authorQueries.orderByNewest}
    LIMIT $${params.length + 1} OFFSET $${params.length + 2}
  `;

        const countQuery = `
    ${authorQueries.baseCount}
    ${whereClause}
  `;

        const dataParams = [...params, limit, offset];
        console.log(dataParams, 'ini data paams')

        const [dataResult, countResult] = await Promise.all([
            this.pool.query<AuthorInterface>(dataQuery, dataParams),
            this.pool.query<CountRow>(countQuery, params),
        ]);

        const totalItems = Number(countResult.rows[0]?.total ?? 0);

        const meta: MetaResponse = {
            page,
            limit,
            total_items: totalItems,
            total_pages: Math.ceil(totalItems / limit),
        };

        return {
            items: dataResult.rows.map(row => this.toDomain(row)),
            meta,
        };
    }

    private buildWhereClause(query: GetAuthorsDto): {
        whereClause: string;
        params: QueryParam[];
    } {
        const conditions: string[] = [];
        const params: QueryParam[] = [];

        if (query.search) {
            params.push(`%${query.search}%`);
            conditions.push(authorQueries.searchByName.replace('$1', `$${params.length}`));
        }

        if (conditions.length === 0) {
            return {
                whereClause: '',
                params,
            };
        }

        return {
            whereClause: `WHERE ${conditions.join(' AND ')}`,
            params,
        };
    }


    private toDomainById(row: any): AuthorInterface | null {
        if (row.length === 0) return null;
        const booklist = row.map((item: any) => {
            return {
                id: item.book_id,
                title: item.book_title,
                isbn: item.isbn,
                price: item.price,
                stock: item.stock,
                published_date: item.book_published_date
            }
        })
        const author = {
            id: row[0].id,
            name: row[0].name,
            bio: row[0].bio,
            created_at: row[0].created_at,
            books: booklist
        }

        return author

    }


    private toDomain(row: any): AuthorInterface {
        return {
            id: row.id,
            name: row.name,
            bio: row.bio,
            created_at: row.created_at,
        };
    }


}
