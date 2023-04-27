import {
  IsDate,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservation {
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  placeId: string;

  invoiceId: string;

  // @IsDefined()
  // @IsNotEmptyObject()
  // @ValidateNested()
  // @Type(() => CreateChargeDto)
  // charge: CreateChargeDto;
}
