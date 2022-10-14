import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class FindEmailUserDto {

    @ApiProperty({type: String , description: 'email'})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({type: String , description: 'passWord'})
    @IsNotEmpty()
    newPassWord: string;

    @ApiProperty({type: String , description: 'passWord'})
    @IsNotEmpty()
    confirmPassWord: string;
}