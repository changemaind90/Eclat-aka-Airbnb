import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({example: "some@gmail.com"})
    readonly email: string;

    @ApiProperty({example: "12345"})
    readonly password: string;
}