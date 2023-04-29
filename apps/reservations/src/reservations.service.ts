import { Inject, Injectable } from '@nestjs/common';
import { ReservationsRepository } from './reservation.repository';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { UpdateReservationDto } from './dtos/update-reservation.dto';
import { PAYMENTS_SERVICE, UserDto } from '@app/shared';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}
  async create(createReservationDto: CreateReservationDto, user: UserDto) {
    return this.paymentsService
      .send('create_charge', {
        ...createReservationDto.charge,
        email: user.email,
      })
      .pipe(
        map((res) => {
          console.log('res', res);
          return this.reservationsRepository.create({
            ...createReservationDto,
            invoiceId: res.id,
            timestamp: new Date(),
            userId: user._id,
          });
        }),
      );
    // return this.reservationsRepository.create({
    //   ...data,
    //   timestamp: new Date(),
    //   userId: user._id,
    // });
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
