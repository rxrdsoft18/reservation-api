import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService } from "@nestjs/config";
import { configSchema } from '@app/shared/config/config.schema';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configSchema,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
