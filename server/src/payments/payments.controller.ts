import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Request, Response } from 'express';
import { UkassaService } from './ukassa.service';
import { PaymentDto } from './dto/payment.dto';
import { PayoutDto } from './dto/payout.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService,
    private readonly ukassaService: UkassaService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post('pay')
  async createPayment(@Body() paymentDto: PaymentDto, @Res({passthrough: true}) res: Response, @Req() req: Request) {
    const response = await this.ukassaService.createPayment(paymentDto, 3);
    res.redirect(response.confirmation.confirmation_url);
  }

  @Post('credit-money')
  async creditMoney(@Body() body, @Res({passthrough: true}) res: Response) {
    console.log("+");
    if (body.object.status === "succeeded") {
      await this.paymentsService.creditMoney({...body.object.metadata, amount: body.object.amount.value, id: body.object.id});
    }
    res.status(200).send()
  }

  @UseGuards(AuthGuard("jwt"))
  @Post('payout')
  async createPayout(@Body() payoutDto: PayoutDto, @Res({passthrough: true}) res: Response, @Req() req: Request) {
    return await this.ukassaService.createPayout(payoutDto, req.user);
  }

  @Post('withdraw-money')
  async withdrawMoney(@Body() body, @Res({passthrough: true}) res: Response) {
    console.log(body);
    console.log("+");
    if (body.object.status === "succeeded") {
      await this.paymentsService.withdrawMoney({...body.object.metadata, amount: body.object.amount.value, id: body.object.id});
    }
    res.status(200).send()
  }
}