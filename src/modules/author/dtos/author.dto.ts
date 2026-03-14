import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAuthorDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    name!: string;

    @IsString()
    @MaxLength(1000)
    bio?: string;
}
