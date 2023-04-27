import { CreateReservationDto } from './create-reservation.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {}
