import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {

    @ApiProperty({type: String , description: 'userName'})
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(12)
    @IsOptional()
    userName: string;

    @ApiProperty({type: String , description: 'passWod'})
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(12)
    @IsOptional()
    passWord: string;

    @ApiProperty({type: String , description: 'emil'})
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(12)
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty({type: String , description: 'role'})
    @IsNotEmpty()
    @IsOptional()
    role?: string;
}