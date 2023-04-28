import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async create(createUserDto: Readonly<CreateUserDto>) {
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
}
