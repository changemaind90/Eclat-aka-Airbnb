import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBookingDto } from './dto/create-booking.dto';
import { PrismaService } from 'prisma/prisma.service';
import { connect } from 'http2';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async confirmBook(createBookingDto: CreateBookingDto, userId: number) {
     const booking_id = await this.prisma.listing.findUnique({where: {id: createBookingDto.listingId}});
     if(!booking_id) throw new NotFoundException("Booking not found");
     
    
    return await this.prisma.booking.create({
      data: {
        startDate: new Date(createBookingDto.startDate),
        endDate: new Date(createBookingDto.endDate),
        totalPrice: booking_id.pricePerNight,
        status: "CONFIRMED",
        user: {
          connect: {id: userId}
        },
        listing: {
          connect: {id: createBookingDto.listingId}
        }
      }
    })
  }

  async canselBook(id: number) {
    return await this.prisma.booking.update({
      where: {id},
      data: {
        status: "CANCELED"
      }
    });
  }

  async completeBook(id: number) {
    return await this.prisma.booking.update({
      where: {id},
      data: {
        status: "COMPLETED"
      }
    });
  }

  async getBooks(userId: number) {
    return await this.prisma.booking.findMany({where: {userId}});
  }
}
