import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';

@Module({
  providers: [SharedService],
  exports: [SharedService],
  imports: [DatabaseModule, ConfigModule],
})
export class SharedModule {}
