import { CreateReservation } from './create-reservation';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateReservation extends PartialType(CreateReservation) {}
