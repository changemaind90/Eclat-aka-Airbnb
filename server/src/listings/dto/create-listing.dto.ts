import { ApiProperty } from "@nestjs/swagger";

export class CreateListingDto {
    @ApiProperty({example: "something"})
    readonly title: string;

    @ApiProperty({example: "some description"})
    readonly description: string;

    @ApiProperty({example: "Country, City, Street, Building"})
    readonly address: string;

    @ApiProperty({example: 99999})
    readonly pricePerNight: number;

    @ApiProperty({example: 10})
    readonly numberOfGuests: number;
}
