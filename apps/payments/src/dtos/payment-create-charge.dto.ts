import { IsEmail } from 'class-validator';
import { CreateChargeDto } from '@app/shared';

export class PaymentCreateChargeDto extends CreateChargeDto {
  @IsEmail()
  email: string;
}
