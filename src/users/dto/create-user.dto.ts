import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({type: String , description: 'userName'})
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(12)
    userName: string;

    @ApiProperty({type: String , description: 'passWord'})
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(12)
    passWord: string;

    @ApiProperty({type: String , description: 'email'})
    @IsNotEmpty()
    @MinLength(8)
    @IsEmail()
    email: string;
}