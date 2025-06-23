import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post()
  confirmBook(@Body() createBookingDto: CreateBookingDto, @Req() req) {
    return this.bookingService.confirmBook(createBookingDto, req.user.id);
  }
  
  @Post("/cancel/:id")
  canselBook(@Param('id') id: string) {
    return this.bookingService.canselBook(+id);
  }
  
  @Post("/complete/:id")
  completeBook(@Param('id') id: string) {
    return this.bookingService.completeBook(+id);
  }
  
  @UseGuards(AuthGuard("jwt"))
  @Get()
  getBooks(@Req() req) {
    return this.bookingService.getBooks(req.user.id);
  }
}
