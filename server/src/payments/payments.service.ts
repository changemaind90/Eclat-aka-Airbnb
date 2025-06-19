import { Injectable } from '@nestjs/common';
import { connect } from 'http2';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async creditMoney(metadata) {
    const transaction = await this.prismaService.transaction.findFirst({
      where: { paymentId: metadata.id },
    });

    if (!transaction) {
      await this.prismaService.transaction.create({
        data: {
          amount: Math.round(metadata.amount),
          to: {
            connect: {
              id: Number(metadata.toUserId),
            },
          },
          from: {
            connect: {
              id: Number(metadata.fromUserId),
            },
          },
          listing: {
            connect: {
              id: Number(metadata.listingId),
            },
          },
          paymentId: metadata.id,
        },
      });
      await this.prismaService.user.update({
        where: { id: Number(metadata.toUserId) },
        data: {
          balance: {
            increment: Math.round(metadata.amount),
          },
        },
      });
    }
  }

  async withdrawMoney(metadata) {
     const transaction = await this.prismaService.transaction.findFirst({
      where: { paymentId: metadata.id },
    });

    if (!transaction) {
      await this.prismaService.transaction.create({
        data: {
          amount: Math.round(metadata.amount),
          from: {
            connect: {
              id: Number(metadata.userId),
            },
          },
          paymentId: metadata.id,
        },
      });
      await this.prismaService.user.update({
        where: { id: Number(metadata.userId) },
        data: {
          balance: 0
        },
      });
    }
  }
}
