import { Controller, Get, Param } from "@nestjs/common";
import { PerformanceService } from "./performance.service";
import { GetClassPerformance } from "./dto/get-class-performance";

@Controller('performances')
export class PerformanceController
{
  constructor(private readonly performanceService: PerformanceService) {}

  /**
   * GET /performances/class/:classId
   * Retrieves performance data for the specified class.
   */

  @Get('class/:classId')
  async getClassPerformance(@Param('classId') classId: number): Promise<GetClassPerformance>
  {
    return this.performanceService.getClassPerformance(classId);
  }
}