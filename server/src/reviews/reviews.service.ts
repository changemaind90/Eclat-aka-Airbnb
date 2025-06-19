import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewsDto } from './dto/get-reviews.dto';
import { PrismaService } from 'prisma/prisma.service';
import { connect } from 'http2';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto, user: any) {
    const review = await this.prisma.review.create({
      data: {
        author: {
          connect: {
            id: user.id
          }
        },
        listing: {
          connect: {
            id: createReviewDto.listingId
          }
        }, 
        booking: {
          connect: {
            id: createReviewDto.bookingId
          }
        }, 
        rating: createReviewDto.rating,
        comment: createReviewDto.comment
      }
    });
    return review;
  }

  async getAllForListing(getReviewsDto: GetReviewsDto) {
    const reviews = await this.prisma.review.findMany({
      where: {
        listingId: getReviewsDto.listingId
      }
    });

    let overallRating = 0;
    reviews.forEach(elem => overallRating += elem.rating)
    overallRating /= reviews.length;

    return {
      overallRating,
      reviews
    };
  }
}
