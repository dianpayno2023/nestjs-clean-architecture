import { Body, Controller, Get, Post, Delete, Patch, Query, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CreateAuthorDto } from '../dtos/author.dto';
import { AuthorInterface } from '../interfaces/author.interface';
import { AuthorService } from '../services/author.service';
import { ResponsePayload } from 'src/common/interfaces/api-response.interface';
import { Roles } from 'src/common/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/common/guards/jwtauth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { GetAuthorsDto } from '../dtos';


@Controller('authors')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AuthorController {
    constructor(private readonly svc: AuthorService) { }

    @Post()
    async create(@Body() payload: CreateAuthorDto): Promise<ResponsePayload<AuthorInterface>> {
        const result = await this.svc.createAuthor(payload);
        return {
            message: 'Author created successfully',
            data: result,
            meta: null,
        }
    }
    @Get(':id')
    async findById(@Param('id', new ParseUUIDPipe()) id: string): Promise<ResponsePayload<AuthorInterface | null>> {
        const result = await this.svc.getAuthorById(id);
        return {
            message: 'Author found successfully',
            data: result,
            meta: null,
        }
    }
    @Patch(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() payload: CreateAuthorDto): Promise<ResponsePayload<AuthorInterface | null>> {
        const result = await this.svc.updateAuthor(id, payload);
        return {
            message: 'Author updated successfully',
            data: result,
            meta: null,
        }
    }

    @Get()
    async findAll(@Query() query: GetAuthorsDto): Promise<ResponsePayload<AuthorInterface[]>> {

        const result = await this.svc.getAllAuthor(query);

        return {
            message: 'Authors found successfully',
            data: result.items,
            meta: result.meta,
        }
    }

    // @Delete()
    // async delete(id: string): Promise<AuthorInterface[]> {
    //     return this.svc.deleteAuthor(id);
    // }
}
