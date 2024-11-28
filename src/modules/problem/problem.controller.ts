import { Controller, HttpCode, Get, Post, Body, Param} from "@nestjs/common";
import { ProblemService } from "./problem.service";
import { Problem } from "../../entities/problem.entity";
import { CreateProblemDto } from "./dto/create-problem.dto";

@Controller('problems')
export class ProblemController
{
  constructor(private readonly problemService: ProblemService) {}

  @Get('getOne/:id')
  @HttpCode(200)
  async getOne(@Param('id') id: number): Promise<Problem>
  {
    return await this.problemService.getOne(id);
  }

  @Post('create')
  @HttpCode(200)
  async create(@Body() createProblem: CreateProblemDto): Promise<Problem>
  {
    return await this.problemService.create(createProblem)
  }
}