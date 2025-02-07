import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from "../../database/database.module";
import { PerformanceService } from "./performance.service";
import { PerformanceController } from "./performance.controller";
import { Class } from "../../entities/class.entity";

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      Class,
    ])
  ],
  controllers: [PerformanceController],
  providers: [PerformanceService]

})

export class PerformanceModule {}