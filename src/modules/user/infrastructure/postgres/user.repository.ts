import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseError } from 'pg';
import { PostgresService } from '../../../../infrastructure/database/postgres.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../interfaces/user.interface';
import { UserRepositoryInterface } from '../../repositories/user.repository.interface';
import { userQueries } from './user.queries';

interface UserRow {
  id: number;
  name: string;
  email: string;
  created_at: Date;
}

@Injectable()
export class UserPostgresRepository implements UserRepositoryInterface {
  constructor(private readonly postgresService: PostgresService) {}

  async create(payload: CreateUserDto): Promise<User> {
    try {
      const result = await this.postgresService.query<UserRow>(userQueries.create, [
        payload.name,
        payload.email,
      ]);

      return this.toDomain(result.rows[0]);
    } catch (error) {
      if (this.isUniqueViolation(error)) {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    const result = await this.postgresService.query<UserRow>(userQueries.findAll);

    return result.rows.map((row) => this.toDomain(row));
  }

  private toDomain(row: UserRow): User {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      createdAt: row.created_at,
    };
  }

  private isUniqueViolation(error: unknown): boolean {
    return error instanceof DatabaseError && error.code === '23505';
  }
}
