import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { Club } from './clubs.entity';
import { ClubsService } from './clubs.service';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Post()
  createBulk(@Body() dtos: CreateClubDto[]): Promise<Club[]> {
    return this.clubsService.createBulk(dtos);
  }

  @Get()
  findAll(): Promise<Club[]> {
    return this.clubsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Club> {
    return this.clubsService.findOne(id);
  }

  @Get(':partialName')
  findOneByName(@Param('partialName') partialName: string): Promise<Club> {
    return this.clubsService.findOneByName(partialName);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.clubsService.remove(id);
  }
}
