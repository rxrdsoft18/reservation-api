import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { GetUserDto } from './dtos/get-user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ email });
  }

  async create(createUserDto: Readonly<CreateUserDto>) {
    const existingUser = await this.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.hashPassword(createUserDto.password);
    return this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async verifyUser(email: string, password: string) {
    console.log('verifyUser', email, password);
    const user = await this.usersRepository.findOne({ email });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credentials not valid');
    }
    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto);
  }
}
