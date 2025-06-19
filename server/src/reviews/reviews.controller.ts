import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewsDto } from './dto/get-reviews.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @Req() req: Request) {
    return this.reviewsService.create(createReviewDto, req.user);
  }

  @Get()
  getAllForListing(@Body() getReviewsDto: GetReviewsDto) {
    return this.reviewsService.getAllForListing(getReviewsDto);
  }
}
