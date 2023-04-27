import { Injectable } from '@nestjs/common';
import { ReservationsRepository } from './reservation.repository';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { UpdateReservationDto } from './dtos/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}
  async create(data: CreateReservationDto) {
    console.log('data', data);
    return this.reservationsRepository.create({
      ...data,
      timestamp: new Date(),
      userId: '123',
    });
  }
  async findAll() {
    return this.reservationsRepository.find({});
  }
  async findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }
  async update(_id: string, data: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      {
        $set: data,
      },
    );
  }
  async remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}
