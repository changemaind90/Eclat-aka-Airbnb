import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { PrismaService } from 'prisma/prisma.service';
import { connect } from 'http2';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async confirmBook(createBookingDto: CreateBookingDto, userId: number) {
    return await this.prisma.booking.create({
      data: {
        startDate: new Date(createBookingDto.startDate),
        endDate: new Date(createBookingDto.endDate),
        totalPrice: createBookingDto.totalPrice,
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
