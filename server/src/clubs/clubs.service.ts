import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import escapeLikeString from 'src/util/escapeLikeString';
import { Like, Repository } from 'typeorm';
import { CreateClubDto } from './dto/create-club.dto';
import { Club } from './clubs.entity';

@Injectable()
export class ClubsService {
  constructor(@InjectRepository(Club) private readonly clubsRepository: Repository<Club>) {}

  createBulk(dtos: CreateClubDto[]): Promise<Club[]> {

    const clubs = dtos.map(dto => {
      
      const club = new Club();
      
      club.id = dto.clubId;
      club.clubName = dto.name;
      club.streetAddress = dto.streetAddress;
      club.city = dto.city;
      club.postCode = dto.postCode;
      club.phoneNumber = dto.phoneNumber;
      club.faxNumber = dto.faxNumber;
      club.email = dto.email;
      club.drivingInstructions = dto.drivingInstructions;
      club.requiredHcp = parseInt(dto.requiredHcp);
      club.status = dto.status;
      club.abbreviation = dto.abbreviation;
  
      return club
    })

    return this.clubsRepository.save(clubs);
  }

  async findAll(): Promise<Club[]> {
    return this.clubsRepository.find();
  }

  findOne(id: number): Promise<Club> {
    return this.clubsRepository.findOne(id, {relations: ['rounds']});
  }

  findOneByName(name: string): Promise<Club> {
    return this.clubsRepository.findOne({
      clubName: Like(`%${escapeLikeString(name)}%`)
    });
  }

  async remove(id: number): Promise<void> {
    await this.clubsRepository.delete(id);
  }
}
