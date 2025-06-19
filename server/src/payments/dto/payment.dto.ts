export class PaymentDto {
    readonly amount: number;
    readonly returnUrl: string;
    readonly toUserId: number;
    readonly listingId: number;
}
