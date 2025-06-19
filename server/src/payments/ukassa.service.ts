import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { PaymentDto } from './dto/payment.dto';
import { PayoutDto } from './dto/payout.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class 
UkassaService {
  private readonly shopId = process.env.YOOKASSA_SHOP_ID;
  private readonly secretKey = process.env.YOOKASSA_SECRET_KEY;
  private readonly gatewayId = process.env.YOOKASSA_GATEWAY_ID;
  private readonly payoutSecretKey = process.env.YOOKASSA_PAYOUT_SECRET_KEY;
  private readonly baseUrl = 'https://api.yookassa.ru/v3';

  constructor(private readonly prismaService: PrismaService) {}

  private get headers() {
    const credentials = btoa(`${this.shopId}:${this.secretKey}`);
    return {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
      'Idempotence-Key': uuidv4(),
    };
  }

  async createPayment(paymentDto: PaymentDto, user) {
    const response = await axios.post(
      `${this.baseUrl}/payments`,
      {
        amount: {
          value: 9999, //paymentDto.amount.toFixed(2),
          currency: 'RUB',
        },
        confirmation: {
          type: 'redirect',
          return_url: "https://vk.com", //paymentDto.returnUrl
        },
        capture: true,
        description: 'Оплата заказа',
        metadata: {
          toUserId: 1, //paymentDto.toUserId,
          fromUserId: user.id,
          listingId: 2, //paymentDto.listingId,
        }
      },
      { headers: this.headers },
    );

    return response.data;
  }

  async createPayout(payoutDto: PayoutDto, user: any) {
    const userDb = await this.prismaService.user.findFirst({where: {id: user.id}});

    const response = await axios.post(
      `${this.baseUrl}/payouts`,
      {
        amount: {
          value: String(userDb?.balance) + ".00",
          currency: 'RUB',
        },
        payout_destination_data: {
          type: "yoo_money",
          account_number: "4100116075156746", //payoutDto.recipientCardNumber,
        },
        description: 'Выплата пользователю',
        metadata: {
          userId: user.id
        }
      },
      {
        headers: this.headers,
        auth: {
          username: String(this.gatewayId),
          password: String(this.payoutSecretKey)
        }
      },
    );

    return response.data;
  }
}
