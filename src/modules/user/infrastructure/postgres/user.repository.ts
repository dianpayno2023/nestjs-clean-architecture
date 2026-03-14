import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseError } from 'pg';
import { PostgresService } from '../../../../infrastructure/database/postgres.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User, UserRow } from '../../interfaces/user.interface';
import { UserRepositoryInterface } from '../../repositories/user.repository.interface';
import { userQueries } from './user.queries';



@Injectable()
export class UserPostgresRepository implements UserRepositoryInterface {
  constructor(private readonly pool: PostgresService) { }

  async create(payload: CreateUserDto): Promise<User> {
    try {
      const result = await this.pool.query<UserRow>(userQueries.create, [
        payload.email,
        payload.password,
        payload.fullName,
        payload.role,
      ]);

      return this.toDomain(result.rows[0]);
    } catch (error) {
      if (error instanceof DatabaseError && error.code === '23505') {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.pool.query<UserRow>(userQueries.findByEmail, [email]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.toDomain(result.rows[0]);
  }

  private toDomain(row: UserRow): User {
    return {
      id: row.id,
      email: row.email,
      password: row.password,
      fullName: row.full_name,
      role: row.role,
      createdAt: row.created_at,
    };
  }
}
