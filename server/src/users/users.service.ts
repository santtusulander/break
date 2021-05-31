import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from 'src/clubs/clubs.entity';
import cookRawMany from 'src/util/cookRawMany';
import escapeLikeString from 'src/util/escapeLikeString';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  create(dto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.id = dto.personId;
    user.gender = dto.gender;
    user.fullName = `${dto.firstName} ${dto.lastName}`;
    user.hcp = dto.hcp;
    user.club = {id: dto.homeClubId} as Club;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id, {relations: ['rounds']});
  }

  async findByName(name: string): Promise<User[]> {
    const q = this.usersRepository
    .createQueryBuilder('user')
    .select(['user', 'club.abbreviation as club_clubabbrev'])
    .where(`LOWER(user.fullName) LIKE LOWER(:fullName)`)
    .innerJoin(Club, 'club', 'user.clubId = club.id')
    .setParameters({fullName: `%${escapeLikeString(name)}%`})

    // rows come out with table name prefixes on keys
    return cookRawMany(await q.getRawMany()) as User[]
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
