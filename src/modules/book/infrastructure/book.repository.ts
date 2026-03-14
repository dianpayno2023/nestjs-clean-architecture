import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseError } from 'pg';
import { PostgresService } from '../../../infrastructure/database/postgres.service';
import { BookRepositoryInterface } from '../repositories/book.repository.interface';
import { booksQueries } from './book.queries';
import { MetaResponse } from 'src/common/interfaces/api-response.interface';
import { CreateBookDto, GetQueryParamBookDto } from '../dtos';
import { BookInterface, CountRow, GetBooksResult, QueryParam } from '../interfaces';



@Injectable()
export class BookPostgresRepository implements BookRepositoryInterface {
    constructor(private readonly pool: PostgresService) { }

    async create(payload: CreateBookDto): Promise<BookInterface> {
        try {
            const result = await this.pool.query<BookInterface>(booksQueries.create, [
                payload.title,
                payload.author_id,
                payload.isbn,
                payload.price,
                payload.stock,
                payload.publish_date ?? null,

            ]);

            return this.toDomain(result.rows[0]);
        } catch (error) {
            if (error instanceof DatabaseError && error.code === '23505') {
                throw new ConflictException('Books already exists');
            }

            throw error;
        }
    }

    async update(id: string, payload: CreateBookDto): Promise<BookInterface | null> {
        try {
            const result = await this.pool.query<BookInterface>(booksQueries.update, [
                payload.title,
                payload.author_id,
                payload.isbn,
                payload.price,
                payload.stock,
                payload.publish_date ?? null,
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

    async findById(id: string): Promise<BookInterface | null> {
        try {
            const result = await this.pool.query<BookInterface>(booksQueries.findById, [id]);
            if (!result.rows.length) {
                return null;
            } else {
                return this.toDomain(result.rows[0]);
            }

        } catch (error) {
            throw error;
        }
    }

    async delete(id: string): Promise<BookInterface | null> {
  try {

    const result = await this.pool.query<BookInterface>(
      booksQueries.delete,
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

    async findAll(query: GetQueryParamBookDto): Promise<GetBooksResult> {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const offset = (page - 1) * limit;
        const { whereClause, params } = this.buildWhereClause(query);

        const dataQuery = `
    ${booksQueries.baseSelect}
    ${whereClause}
    ${booksQueries.orderByNewest}
    LIMIT $${params.length + 1} OFFSET $${params.length + 2}
  `;
        const countQuery = `
    ${booksQueries.baseCount}
    ${whereClause}
  `;
        const dataParams = [...params, limit, offset];
        console.log(dataParams, 'ini data paams')

        const [dataResult, countResult] = await Promise.all([
            this.pool.query<BookInterface>(dataQuery, dataParams),
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

    private buildWhereClause(query: GetQueryParamBookDto): {
        whereClause: string;
        params: QueryParam[];
    } {
        const conditions: string[] = [];
        const params: QueryParam[] = [];

        if (query.search) {
            params.push(`%${query.search}%`);
            conditions.push(booksQueries.searchByTitle.replace('$1', `$${params.length}`));
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






    private toDomain(row: BookInterface): BookInterface {
        return {
            id: row.id,
            title: row.title,
            stock: row.stock,
            price: row.price,
            publish_date: row.publish_date,
            author_id: row.author_id,
            isbn: row.isbn,
            created_at: row.created_at,
            author: {
                id: row.author?.id,
                name: row.author?.name,
                bio: row.author?.bio,
                created_at: row.author?.created_at
            }

        };
    }


}
