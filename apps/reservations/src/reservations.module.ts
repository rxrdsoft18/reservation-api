import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { DatabaseModule, LoggerModule } from '@app/shared';
import { ReservationsRepository } from './reservation.repository';
import {
  ReservationDocument,
  ReservationSchema,
} from './models/reservation.schema';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from '../config.schema';
import { AUTH_SERVICE, PAYMENTS_SERVICE } from '@app/shared';
import { SharedModule } from '@app/shared/shared.module';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/reservations/.env',
      validationSchema: configSchema,
    }),
    SharedModule.registerTCP(AUTH_SERVICE, 'AUTH_HOST', 'AUTH_PORT'),
    SharedModule.registerTCP(
      PAYMENTS_SERVICE,
      'PAYMENTS_HOST',
      'PAYMENTS_PORT',
    ),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
