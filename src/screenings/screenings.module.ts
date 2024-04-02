import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreeningsController } from './screenings.controller';
import { Screening} from './screening.entity';
import { ScreeningsService } from './screenings.service';
@Module({
  imports: [TypeOrmModule.forFeature([Screening])],
  providers: [ScreeningsService],
  controllers: [ScreeningsController],
})
export class ScreeningsModule {}
