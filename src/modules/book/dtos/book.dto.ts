import { IsDate, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    title!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    author_id!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    isbn!: string;

    @IsNumber()
    @IsNotEmpty()
    price!: number;

    @IsNumber()
    @IsNotEmpty()
    stock!: number;

    @IsDate()
    publish_date?: Date;
}
