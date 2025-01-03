import { Controller, HttpCode, Get, Post, Body, Param, Query } from "@nestjs/common";
import { ProblemService } from "./problem.service";
import { Problem } from "../../entities/problem.entity";
import { CreateProblemDto } from "./dto/create-problem.dto";
import { UpdateProblemDto } from "./dto/update-problem.dto";

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

  @Get('getAll')
  @HttpCode(200)
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
    ): Promise<{problems: Problem[] }>
  {
    return await this.problemService.getAll(page, limit);
  }

  @Post('create')
  @HttpCode(201)
  async create(@Body() createProblem: CreateProblemDto): Promise<Problem>
  {
    return await this.problemService.create(createProblem)
  }

  @Post('update/:id')
  @HttpCode(202)
  async update(
    @Param('id') id: number,
    @Body() updateProblem: UpdateProblemDto,
    ): Promise<ShortResponse>
  {
    return await this.problemService.update(id, updateProblem);
  }

  @Post('delete/:id')
  @HttpCode(202)
  async delete(@Param('id') id: number): Promise<ShortResponse>
  {
    return this.problemService.delete(id);
  }

}