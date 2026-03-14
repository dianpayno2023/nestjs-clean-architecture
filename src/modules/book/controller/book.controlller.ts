import { Body, Controller, Get, Post, Delete, Patch, Query, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CreateBookDto, GetQueryParamBookDto, } from '../dtos';
import { BookInterface } from '../interfaces';
import { ResponsePayload } from 'src/common/interfaces/api-response.interface';
import { Roles } from 'src/common/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/common/guards/jwtauth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { BookService } from '../services/book.service';



@Controller('books')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class BookController {
    constructor(private readonly svc: BookService) { }

    @Post()
    async create(@Body() payload: CreateBookDto): Promise<ResponsePayload<BookInterface>> {
        const result = await this.svc.createBook(payload);
        return {
            message: 'Book created successfully',
            data: result,
            meta: null,
        }
    }
    @Get(':id')
    async findById(@Param('id', new ParseUUIDPipe()) id: string): Promise<ResponsePayload<BookInterface | null>> {
        const result = await this.svc.getAuthorById(id);
        return {
            message: 'success',
            data: result,
            meta: null,
        }
    }
    @Patch(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() payload: CreateBookDto): Promise<ResponsePayload<BookInterface | null>> {
        const result = await this.svc.updateBook(id, payload);
        return {
            message: 'Book updated successfully',
            data: result,
            meta: null,
        }
    }

    @Get()
    async findAll(@Query() query: GetQueryParamBookDto): Promise<ResponsePayload<BookInterface[]>> {

        const result = await this.svc.getAllBook(query);

        return {
            message: 'Book List found successfully',
            data: result.items,
            meta: result.meta,
        }
    }

    @Delete(':id')
    async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<ResponsePayload<BookInterface | null>> {
        const result = await this.svc.deleteBook(id);
        return {
            message: 'Book Deleted successfully',
            data: result,
            meta: null,
        }
    }
}
