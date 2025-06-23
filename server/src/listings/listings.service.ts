import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createListingDto: CreateListingDto, userId: number) {
    return this.prisma.listing.create({
      data: {
        ...createListingDto,
        owner: {
          connect: {id: userId}
        }
      }
    });
  }

  async find(userId: number) {
    return  this.prisma.listing.findMany({
      where: {
        ownerId: userId
      }
    })
  }

  async findAll() {
    return this.prisma.listing.findMany();
  }

  async findOne(id: number) {
    return this.prisma.listing.findFirst({where: {id}});
  }

  async update(id: number, updateListingDto: UpdateListingDto) {
    return this.prisma.listing.update({
      where: {id},
      data: updateListingDto
    });
  }

  async remove(id: number) {
    return this.prisma.listing.delete({where: {id}});
  }
}
