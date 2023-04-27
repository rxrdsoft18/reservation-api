import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from "@nestjs/mongoose";
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@app/shared/config/config.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017/sleepr'),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
