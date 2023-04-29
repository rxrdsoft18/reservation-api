import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from '../config.schema';
import { LoggerModule, NOTIFICATIONS_SERVICE } from '@app/shared';
import { SharedModule } from '@app/shared/shared.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: './apps/payments/.env',
      isGlobal: true,
      validationSchema: configSchema,
    }),
    SharedModule.registerTCP(
      NOTIFICATIONS_SERVICE,
      'NOTIFICATIONS_HOST',
      'NOTIFICATIONS_PORT',
    ),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
