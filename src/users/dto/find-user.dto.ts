import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class FindUserDto {

    @ApiProperty({type: String , description: 'userName'})
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(12)
    userName: string;

    @ApiProperty({type: String , description: 'userName'})
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(12)
    passWord: string;
}