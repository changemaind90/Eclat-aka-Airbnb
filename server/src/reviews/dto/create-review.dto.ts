export class CreateReviewDto {
    readonly listingId: number;
    readonly bookingId: number;
    readonly rating: number;
    readonly comment: string;
}
