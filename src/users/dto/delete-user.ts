import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DeleteUserDto {

    @ApiProperty({type: String , description: 'id'})
    @IsNotEmpty()
    id: string;
}