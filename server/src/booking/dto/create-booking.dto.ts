export class CreateBookingDto {
    readonly listingId: number;
    readonly startDate: string;
    readonly endDate: string;
    readonly totalPrice: number;
}