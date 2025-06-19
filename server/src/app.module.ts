import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BookingModule } from './booking/booking.module';
import { ListingsService } from './listings/listings.service';
import { ListingsController } from './listings/listings.controller';
import { ListingsModule } from './listings/listings.module';
import { PaymentsModule } from './payments/payments.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    BookingModule,
    ListingsModule,
    PaymentsModule,
    ReviewsModule
  ],
  providers: [PrismaService, ListingsService],
  controllers: [ListingsController],
})
export class AppModule {}
