import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@Body() createListingDto: CreateListingDto, @Req() req) {
    return this.listingsService.create(createListingDto, req.user.id);
  }
  
  @UseGuards(AuthGuard("jwt"))
  @Get()
  findAll(@Req() req) {
    return this.listingsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingsService.update(+id, updateListingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listingsService.remove(+id);
  }
}
