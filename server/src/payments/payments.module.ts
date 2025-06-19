import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { UkassaService } from './ukassa.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, UkassaService, PrismaService],
})
export class PaymentsModule {}
