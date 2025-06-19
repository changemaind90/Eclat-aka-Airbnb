import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiHeaders, ApiResponse } from '@nestjs/swagger';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @ApiBearerAuth()
  @ApiResponse({example: {
    id: 2,
    title: "test1",
    description: "some1",
    address: "somewhere1",
    pricePerNight: 999,
    numberOfGuests: 50,
    ownerId: 7
  }})
  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@Body() createListingDto: CreateListingDto, @Req() req) {
    return this.listingsService.create(createListingDto, req.user.id);
  }
  
  @ApiBearerAuth()
  @ApiResponse({example: [
    {
      id: 2,
      title: "test1",
      description: "some1",
      address: "somewhere1",
      pricePerNight: 999,
      numberOfGuests: 50,
      ownerId: 1
    },
    {
      id: 3,
      title: "test2",
      description: "some2",
      address: "somewhere2",
      pricePerNight: 5555,
      numberOfGuests: 100,
      ownerId: 1
    }
  ]})
  @UseGuards(AuthGuard("jwt"))
  @Get()
  find(@Req() req) {
    return this.listingsService.find(req.user.id);
  }
  
  @ApiResponse({example: [
    {
      id: 2,
      title: "test1",
      description: "some1",
      address: "somewhere1",
      pricePerNight: 999,
      numberOfGuests: 50,
      ownerId: 7
    },
    {
      id: 3,
      title: "test2",
      description: "some2",
      address: "somewhere2",
      pricePerNight: 5555,
      numberOfGuests: 100,
      ownerId: 16
    }
  ]})
  @Get("all")
  findAll(@Req() req) {
    return this.listingsService.findAll();
  }

  @ApiResponse({example: {
    id: 2,
    title: "test1",
    description: "some1",
    address: "somewhere1",
    pricePerNight: 999,
    numberOfGuests: 50,
    ownerId: 7
  }})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingsService.findOne(+id);
  }

  @ApiResponse({example: {
    id: 2,
    title: "test1",
    description: "some1",
    address: "somewhere1",
    pricePerNight: 999,
    numberOfGuests: 50,
    ownerId: 7
  }})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingsService.update(+id, updateListingDto);
  }

  @ApiResponse({example: {
    id: 2,
    title: "test1",
    description: "some1",
    address: "somewhere1",
    pricePerNight: 999,
    numberOfGuests: 50,
    ownerId: 7
  }})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listingsService.remove(+id);
  }
}
