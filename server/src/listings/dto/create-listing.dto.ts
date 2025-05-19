export class CreateListingDto {
    readonly title: string;
    readonly description: string;
    readonly address: string;
    readonly pricePerNight: number;
    readonly numberOfGuests: number;
}
